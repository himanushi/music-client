import { Howl } from 'howler'
import { Track } from '../../graphql/types.d'
import { ActionType } from '../../hooks/playerContext'

class PreviewPlayer {
  playlist: Howl[]
  tracks: Track[]
  currentPlaybackNo: number
  dispatch?: React.Dispatch<ActionType>

  constructor(
    { urls, tracks, dispatch }:
    { urls:string[], tracks:Track[], dispatch?: React.Dispatch<ActionType> }
  ){
    this.currentPlaybackNo = 0
    this.playlist = urls.map((url) => {
      return new Howl({
        src: url,
        html5: true,
        preload: false,
        autoplay: false,
        onend: () => this.autoNextPlay(),
      })
    })
    this.tracks = tracks
    this.dispatch = dispatch
  }

  currentPlaybackTime() {
    if(this.playlist.length === 0) return 0

    if(this.playlist[this.currentPlaybackNo].state() !== "unloaded") {
      return this.playlist[this.currentPlaybackNo].seek()
    } else {
      return 0
    }
  }

  async play(no?:number) {
    if(this.playlist.length === 0) return

    if(no === undefined) {
      await this.playlist[this.currentPlaybackNo].play()
    } else {
      this.stopAndPlay(this.currentPlaybackNo, no)
      this.currentPlaybackNo = no
    }
  }

  async autoNextPlay() {
    if(this.dispatch) this.dispatch({ type: "NEXT_PLAY" })
  }

  nextPlay():number {
    if(this.playlist.length === 0) return 0
    const nextNo = this.currentPlaybackNo + 1
    if((this.playlist.length - 1) < nextNo) {
      return this.currentPlaybackNo = 0
    }
    this.stopAndPlay(this.currentPlaybackNo, nextNo)
    return this.currentPlaybackNo = nextNo
  }

  async stopAndPlay(stopNo:number, playNo:number) {
    await this.playlist[stopNo].stop()
    await this.playlist[playNo].play()
  }

  async pause() {
    if(this.playlist.length === 0) return

    await this.playlist[this.currentPlaybackNo].pause()
  }

  async stop() {
    if(this.playlist.length === 0) return

    await this.playlist[this.currentPlaybackNo].stop()
    this.currentPlaybackNo = 0
  }
}

export default PreviewPlayer
