import { Track, AppleMusicTrack } from '../../graphql/types.d'
import { ActionType } from '../../hooks/playerContext'

// queue に複数の音楽を入れるべきだが実装都合上一曲のみを扱う
class AppleMusicPlayer {
  track?: Track
  isLastTrack?: boolean
  currentPlaybackNo?: number
  dispatch: React.Dispatch<ActionType>

  constructor({ dispatch }:{ dispatch: React.Dispatch<ActionType> }){
    this.dispatch = dispatch
    this.isLastTrack = false
    // リセット
    MusicKit.getInstance().setQueue({})
    // 次再生をリスナーに登録
    // TODO: このあたりは大分実装がはちゃめちゃなのでいつかリファクタ
    if(MusicKit.getInstance().player._registry.playbackStateDidChange.length === 1) {
      if(MusicKit.getInstance().player._registry.playbackStateDidChange.length === 2) {
        MusicKit.getInstance().player._registry.playbackStateDidChange = MusicKit.getInstance().player._registry.playbackStateDidChange.slice(1)
      }
      MusicKit.getInstance().player.addEventListener("playbackStateDidChange", async (state) => {
        switch(MusicKit.PlaybackStates[state.state]){
          case "ended":
            if(this.isLastTrack) {
              this.dispatch({ type: "STATUS_FINISH" })
            } else {
              this.dispatch({ type: "NEXT_PLAY" })
            }
            break
        }
      })
    }
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

  async play(no: number, track: Track, isLastTrack: boolean) {
    const music = MusicKit.getInstance()
    const appleMusicTrack = track.appleMusicTracks?.find(a => a)
    if(!appleMusicTrack) {
      this.dispatch({ type: "NEXT_PLAY" })
      return
    }

    if(no === this.currentPlaybackNo) {
      // 再生可否による分岐
      if(music.player.queue.items.length === 1){
        console.log("Play Apple Music")
        this.isLastTrack = isLastTrack
        await music.play()
      } else {
        // 再生不可の場合は次の曲を再生
        this.dispatch({ type: "NEXT_PLAY" })
      }
    } else {
      this.currentPlaybackNo = no
      this.track  = track
      await music.setQueue({ songs: [appleMusicTrack.appleMusicId] })
      this.play(no, track, isLastTrack)
    }
  }

  async pause(no: number) {
    // 未再生の場合はセットしない
    this.currentPlaybackNo = this.currentPlaybackNo === undefined ? undefined : no
    console.log("Pause Apple Music")
    await MusicKit.getInstance().pause()
  }

  async stop(no: number) {
    this.currentPlaybackNo = undefined
    console.log("Stop Apple Music")
    if(MusicKit.PlaybackStates[MusicKit.getInstance().player.playbackState] === "playing") {
      await MusicKit.getInstance().stop()
    }
  }
}

export default AppleMusicPlayer
