import { Howl, Howler } from 'howler'

class PreviewPlayer {
  playlist: Howl[]
  currentPlaybackNo: number

  constructor({ urls }:{ urls:string[] }){
    this.currentPlaybackNo = 0
    this.playlist = urls.map((url) => {
      return new Howl({
        src: url,
        html5: true,
        preload: false,
        autoplay: false,
        onend: () => this.nextPlay(),
      })
    })
  }

  currentPlaybackTime() {
    if(this.playlist[this.currentPlaybackNo].state() !== "unloaded") {
      return this.playlist[this.currentPlaybackNo].seek()
    } else {
      return 0
    }
  }

  play(no?:number) {
    if(no) {
      this.playlist[this.currentPlaybackNo].stop()
      this.playlist[no].play()
      this.currentPlaybackNo = no
    } else {
      this.playlist[this.currentPlaybackNo].stop()
      this.playlist[this.currentPlaybackNo].play()
    }
  }

  nextPlay() {
    const nextNo = this.currentPlaybackNo + 1
    if((this.playlist.length - 1) < nextNo) {
      this.currentPlaybackNo = 0
      return
    }
    this.playlist[this.currentPlaybackNo].stop()
    this.playlist[nextNo].play()
    this.currentPlaybackNo = nextNo
  }

  pause() {
    this.playlist[this.currentPlaybackNo].pause()
  }

  stop() {
    this.playlist[this.currentPlaybackNo].stop()
    this.currentPlaybackNo = 0
  }
}

export default PreviewPlayer
