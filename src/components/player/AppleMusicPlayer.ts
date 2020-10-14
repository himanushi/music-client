import { Track, AppleMusicTrack } from '../../graphql/types.d'
import { ActionType } from '../../hooks/playerContext'
import { isEmpty } from 'lodash'

// queue に複数の音楽を入れるべきだが実装都合上一曲のみを扱う
class AppleMusicPlayer {
  linkUrl: string
  tracks: Track[]
  currentPlaybackNo: number
  dispatch?: React.Dispatch<ActionType>

  constructor(
    { linkUrl, tracks, dispatch }:
    { linkUrl:string, tracks:Track[], dispatch?: React.Dispatch<ActionType> }
  ){
    this.linkUrl = linkUrl
    this.currentPlaybackNo = 0
    this.tracks = tracks
    this.dispatch = dispatch
    // リセット
    MusicKit.getInstance().setQueue({})
    // 次再生を登録
    if(MusicKit.getInstance().player._registry.playbackStateDidChange.length == 1) {
      MusicKit.getInstance().player.addEventListener("playbackStateDidChange", async (state) => {
        switch(MusicKit.PlaybackStates[state.state]){
          case "ended":
            await this.autoNextPlay()
            break
        }
      })
    }
  }

  setMediaMetadata(dispatch: React.Dispatch<ActionType>) {
    if(navigator.mediaSession) {
      const track = this.currentTrack()
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

  currentTrack() {
    return this.tracks[this.currentPlaybackNo]
  }

  async play(no?:number) {
    const track = this.tracks[no || this.currentPlaybackNo]
    this.currentPlaybackNo = no || this.currentPlaybackNo

    if(this.dispatch) this.setMediaMetadata(this.dispatch)

    const appleMusicTrack = track.appleMusicTracks?.find(a => a)
    if(!appleMusicTrack) return // TODO: nextPlay()

    // 一時停止の場合のみリセットしない
    if(MusicKit.PlaybackStates[MusicKit.getInstance().player.playbackState] !== "paused") {
      await MusicKit.getInstance().setQueue({ songs: [appleMusicTrack.appleMusicId] })
    }
    await MusicKit.getInstance().play() // TODO: try{ nextPlay() }
  }

  async autoNextPlay() {
    this.dispatch && this.dispatch({ type: "NEXT_PLAY" })
  }

  async nextPlay() {
    const nextNo = this.currentPlaybackNo + 1
    if((this.tracks.length - 1) < nextNo) {
      // プレイリスト最後の曲
      this.currentPlaybackNo = 0
      this.dispatch && this.dispatch({ type: "STATUS_FINISH" })
      return this.currentPlaybackNo
    } else {
      this.currentPlaybackNo = this.currentPlaybackNo + 1
      await MusicKit.getInstance().stop()
      await this.play()
    }
  }

  async pause() {
    await MusicKit.getInstance().pause()
  }

  async stop() {
    this.currentPlaybackNo = 0
    await MusicKit.getInstance().stop()
  }
}

export default AppleMusicPlayer
