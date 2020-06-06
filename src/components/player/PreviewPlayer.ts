import { Howl } from 'howler'
import { Track } from '../../graphql/types.d'
import { ActionType } from '../../hooks/playerContext'
import { isEmpty } from 'lodash'

class PreviewPlayer {
  linkUrl: string
  playlist: { [key:number]:Howl }
  tracks: Track[]
  currentPlaybackNo: number
  dispatch?: React.Dispatch<ActionType>

  constructor(
    { linkUrl, tracks, dispatch }:
    { linkUrl:string, tracks:Track[], dispatch?: React.Dispatch<ActionType> }
  ){
    this.linkUrl = linkUrl
    this.currentPlaybackNo = 0
    this.playlist = {}
    tracks.forEach((track, index) => {
      if(!track.previewUrl) return
      const player:Howl = new Howl({
        src: track.previewUrl,
        html5: true,
        preload: false,
        autoplay: false,
        onend: async () => this.autoNextPlay(),
        onplay: () => {
          // Media Session API
          if(this.dispatch) this.setMediaMetadata(this.dispatch)
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
      this.playlist[index] = player
    })
    this.tracks = tracks
    this.dispatch = dispatch
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
    if(isEmpty(this.playlist)) return
    return this.tracks[this.currentPlaybackNo]
  }

  async play(no?:number) {
    if(isEmpty(this.playlist)) return

    if(no === undefined) {
      const player = this.playlist[this.currentPlaybackNo]
      // 再生可否による分岐
      if(player){
        await player.play()
      } else {
        // 再生不可の場合は次の曲を再生
        await this.autoNextPlay()
      }
    } else {
      this.stopAndPlay(this.currentPlaybackNo, no)
      this.currentPlaybackNo = no
    }
  }

  async autoNextPlay() {
    this.dispatch && this.dispatch({ type: "NEXT_PLAY" })
  }

  async nextPlay():Promise<number> {
    if(isEmpty(this.playlist)) return 0

    const nextNo = this.currentPlaybackNo + 1
    if((this.tracks.length - 1) < nextNo) {
      // プレイリスト最後の曲
      await this.playlist[this.currentPlaybackNo].stop()
      this.currentPlaybackNo = 0
      this.dispatch && this.dispatch({ type: "STATUS_FINISH" })
      return this.currentPlaybackNo
    } else {
      const currentNo = this.currentPlaybackNo
      this.currentPlaybackNo = nextNo
      await this.stopAndPlay(currentNo, nextNo)
      return this.currentPlaybackNo
    }
  }

  async stopAndPlay(stopNo:number, playNo:number) {
    await this.playlist[stopNo]?.stop()
    const player = this.playlist[playNo]
    // 再生可否による分岐
    if(player){
      await player.play()
    } else {
      // 再生不可の場合は次の曲を再生
      await this.autoNextPlay()
    }
  }

  async pause() {
    if(isEmpty(this.playlist)) return

    await this.playlist[this.currentPlaybackNo].pause()
  }

  async stop() {
    if(isEmpty(this.playlist)) return

    await this.playlist[this.currentPlaybackNo].stop()
    this.currentPlaybackNo = 0
  }
}

export default PreviewPlayer
