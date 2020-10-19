import { Howl } from 'howler'
import { Track } from '../../graphql/types.d'
import { ActionType } from '../../hooks/playerContext'

class PreviewPlayer {
  track?: Track
  player?: Howl
  currentPlaybackNo?: number
  dispatch: React.Dispatch<ActionType>

  constructor({ dispatch }:{ dispatch: React.Dispatch<ActionType> }){
    this.dispatch = dispatch
  }

  setMediaMetadata(dispatch: React.Dispatch<ActionType>) {
    if(navigator.mediaSession) {
      const track = this.track
      if(track) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: track.name,
          artwork: [{ src: track.artworkM.url || "", sizes: "300x300", type: 'image/png' }]
        })
      }
      navigator.mediaSession.setActionHandler('play', () => dispatch({ type: "PLAY" }))
      navigator.mediaSession.setActionHandler('pause', () => dispatch({ type: "PAUSE" }))
      navigator.mediaSession.setActionHandler('nexttrack', () => dispatch({ type: "NEXT_PLAY" }))
    }
  }

  canPlay(_track: Track) {
    return true
  }

  async play(no: number, track: Track) {
    if(no === this.currentPlaybackNo) {
      // 再生可否による分岐
      if(this.player){
        await this.player.play()
      } else {
        // 再生不可の場合は次の曲を再生
        this.dispatch({ type: "NEXT_PLAY" })
      }
    } else {
      this.currentPlaybackNo = no
      this.track  = track
      this.player = this.setPlayer(track)
      this.play(no, track)
    }
  }

  setPlayer(track: Track) {
    if(this.player) this.player.stop()
    if(!track.previewUrl) return

    const player:Howl = new Howl({
      src: track.previewUrl,
      html5: true,
      preload: false,
      autoplay: false,
      onend: () => this.dispatch({ type: "NEXT_PLAY" }),
      onplay: () => {
        // Media Session API
        this.setMediaMetadata(this.dispatch)
        // フェードイン
        if(player.volume() === 0) player.fade(0, 0.5, 2000)
        // フェードアウト
        // ref: https://stackoverflow.com/questions/56043259/how-to-make-a-fade-out-at-the-end-of-the-sound-in-howlerjs
        var fadeouttime = 2000;
        setTimeout(
          () => player.fade(0.5, 0, fadeouttime),
          (player.duration() - (player.seek() as number)) * 1000 - fadeouttime
        )
      },
      onstop: () => player.volume(0),
      volume: 0,
    })

    return player
  }

  async pause(no: number) {
    // 未再生の場合はセットしない
    this.currentPlaybackNo = this.currentPlaybackNo === undefined ? undefined : no
    this.player && await this.player.pause()
  }

  async stop() {
    this.currentPlaybackNo = undefined
    this.player && await this.player.stop()
  }
}

export default PreviewPlayer
