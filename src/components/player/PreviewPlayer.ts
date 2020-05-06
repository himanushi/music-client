import { Howl, Howler } from 'howler'

class PreviewPlayer {
  playlist: Howl[]
  nowPlayingNo: number

  constructor({ urls }:{ urls:string[] }){
    this.nowPlayingNo = 0
    this.playlist = urls.map((url) => {
      return new Howl({
        src: url,
        html5: true,
        onend: () => this.nextPlay(),
      })
    })
  }

  nowTrackDuration() {
    return this.playlist[this.nowPlayingNo].duration()
  }

  play(no?:number) {
    if(no) {
      this.playlist[this.nowPlayingNo].stop()
      this.playlist[no].play()
      this.nowPlayingNo = no
    } else {
      this.playlist[this.nowPlayingNo].stop()
      this.playlist[this.nowPlayingNo].play()
    }
  }

  nextPlay() {
    const nextNo = this.nowPlayingNo + 1
    if((this.playlist.length - 1) < nextNo) {
      this.nowPlayingNo = 0
      return
    }
    this.playlist[this.nowPlayingNo].stop()
    this.playlist[nextNo].play()
    this.nowPlayingNo = nextNo
  }

  pause() {
    this.playlist[this.nowPlayingNo].pause()
  }

  stop() {
    this.playlist[this.nowPlayingNo].stop()
    this.nowPlayingNo = 0
  }
}

export default PreviewPlayer
