import { Track } from '../../graphql/types.d'
import { ActionType } from '../../hooks/playerContext'

// queue に複数の音楽を入れるべきだが実装都合上一曲のみを扱う
class AppleMusicPlayer {
  track?: Track
  currentPlaybackNo?: number
  dispatch: React.Dispatch<ActionType>

  constructor({ dispatch }:{ dispatch: React.Dispatch<ActionType> }){
    this.dispatch = dispatch
    // リセット
    MusicKit.getInstance().setQueue({})
    // 次再生をリスナーに登録
    if(MusicKit.getInstance().player._registry.playbackStateDidChange.length === 1) {
      MusicKit.getInstance().player.addEventListener("playbackStateDidChange", (state) => {
        switch(MusicKit.PlaybackStates[state.state]){
          case "ended":
            this.dispatch({ type: "NEXT_PLAY" })
            break
        }
      })
    }
    MusicKit.getInstance().player.volume = 0.5
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

  canPlay(track: Track) {
    const appleMusicTrack = track.appleMusicTracks?.find(a => a)
    return !!appleMusicTrack
  }

  async play(no: number, track: Track) {
    const music = MusicKit.getInstance()
    const appleMusicTrack = track.appleMusicTracks?.find(a => a)

    if(!appleMusicTrack) {
      this.dispatch({ type: "NEXT_PLAY" })
      return
    }

    this.setMediaMetadata(this.dispatch)

    if(no === this.currentPlaybackNo) {
      // 再生可否による分岐
      if(music.player.queue.items.length === 1){
        console.log("Play Apple Music!!")
        await music.play()
      } else {
        // 再生不可の場合は次の曲を再生
        this.dispatch({ type: "NEXT_PLAY" })
      }
    } else {
      this.currentPlaybackNo = no
      this.track  = track
      if(MusicKit.PlaybackStates[MusicKit.getInstance().player.playbackState] === "playing") {
        await MusicKit.getInstance().stop()
      }
      await music.setQueue({ songs: [appleMusicTrack.appleMusicId] })
      this.play(no, track)
    }
  }

  async pause(no: number) {
    // 未再生の場合はセットしない
    this.currentPlaybackNo = this.currentPlaybackNo === undefined ? undefined : no
    console.log("Pause Apple Music!!")
    await MusicKit.getInstance().pause()
  }

  async stop() {
    this.currentPlaybackNo = undefined
    if(MusicKit.PlaybackStates[MusicKit.getInstance().player.playbackState] === "playing") {
      console.log("Stop Apple Music!!")
      await MusicKit.getInstance().stop()
    }
  }
}

export default AppleMusicPlayer
