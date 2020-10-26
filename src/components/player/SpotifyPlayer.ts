import { Track } from '../../graphql/types.d'
import { ActionType } from '../../hooks/playerContext'
import SpotifyWebApi from 'spotify-web-api-node'
import SecureCookies from '../../lib/SecureCookies'

// queue に複数の音楽を入れるべきだが実装都合上一曲のみを扱う
class SpotifyPlayer {
  player: SpotifyWebApi
  track?: Track
  currentPlaybackNo?: number
  dispatch: React.Dispatch<ActionType>
  cookie: SecureCookies
  state: "playing" | "pause" | "stop"

  constructor({ dispatch }:{ dispatch: React.Dispatch<ActionType> }){
    this.cookie = new SecureCookies()
    const accessToken = this.cookie.get('spotifyAccessToken')
    this.player = new SpotifyWebApi({ accessToken })
    this.dispatch = dispatch
    this.state = "stop"
  }

  setMediaMetadata() {
    if(navigator.mediaSession) {
      const track = this.track
      if(track) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: track.name,
          artwork: [{ src: track.artworkM.url || "", sizes: "300x300", type: 'image/png' }]
        })
      }
      navigator.mediaSession.setActionHandler('play', () => this.dispatch({ type: "PLAY" }))
      navigator.mediaSession.setActionHandler('pause', () => this.dispatch({ type: "PAUSE" }))
      navigator.mediaSession.setActionHandler('nexttrack', () => this.dispatch({ type: "NEXT_PLAY" }))
    }
  }

  async play(no: number, track: Track) {
    const spotifyTrack = track.spotifyTracks?.find(a => a)
    if(!spotifyTrack) {
      throw new Error("Not found Spotify Track")
    }

    // TODO: このハンドリングあっているのか検証すること
    const me = await this.player.getMe().catch(e => window.location.reload())
    if(me && me.body.product !== "premium") {
      throw new Error('Premium user only!!')
    }

    const device_id = this.cookie.get("spotifyDeviceId")
    if(!device_id) {
      throw new Error("Not found Spotify Device ID")
    }

    this.track = track
    this.setMediaMetadata()
    this.player.setVolume(50, { device_id })

    if(no === this.currentPlaybackNo) {
      if(this.state === "pause") {
        this.state = "playing"
        console.log("Play Spotify!!")
        await this.player.play({ device_id })
      } else {
        this.state = "playing"
        console.log("Play Spotify!!")
        await this.player.play({
          device_id,
          uris: [`spotify:track:${spotifyTrack.spotifyId}`]
        })
      }
    } else {
      this.state = "playing"
      console.log("Play Spotify!!")
      await this.player.play({
        device_id,
        uris: [`spotify:track:${spotifyTrack.spotifyId}`]
      })
    }

    this.currentPlaybackNo = no
  }

  async pause(no: number) {
    if(!this.track) return
    // 未再生の場合はセットしない
    this.currentPlaybackNo = this.currentPlaybackNo === undefined ? undefined : no
    this.state = "pause"
    console.log("Pause Spotify!!")
    await this.player.pause()
  }

  async stop() {
    if(!this.track) return
    this.currentPlaybackNo = undefined
    this.state = "stop"
    console.log("Stop Spotify!!")
    await this.player.pause()
  }
}

export default SpotifyPlayer
