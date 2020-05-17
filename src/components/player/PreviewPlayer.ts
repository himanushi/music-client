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
      this.playlist[index] =
        new Howl({
          src: track.previewUrl,
          html5: true,
          preload: false,
          autoplay: false,
          onend: async () => this.autoNextPlay(),
        })
    })
    this.tracks = tracks
    this.dispatch = dispatch
  }

  currentTrack() {
    if(isEmpty(this.playlist)) return
    return this.tracks[this.currentPlaybackNo]
  }

  async play(no?:number) {
    if(isEmpty(this.playlist)) return

    if(no === undefined) {
      await this.playlist[this.currentPlaybackNo].play()
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
      this.stopAndPlay(this.currentPlaybackNo, nextNo)
      return this.currentPlaybackNo = nextNo
    }
  }

  async stopAndPlay(stopNo:number, playNo:number) {
    await this.playlist[stopNo].stop()
    await this.playlist[playNo].play()
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
