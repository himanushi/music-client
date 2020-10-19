import { Track } from '../../graphql/types.d'
import { ActionType } from '../../hooks/playerContext'
import PreviewPlayer from './PreviewPlayer'
import AppleMusicPlayer from './AppleMusicPlayer'

// 複数のプレイヤーをまとめる
class Player {
  currentPlyer?: PreviewPlayer | AppleMusicPlayer
  players: [AppleMusicPlayer?, PreviewPlayer?]
  tracks: Track[]
  currentPlaybackNo: number
  dispatch?: React.Dispatch<ActionType>
  linkUrl: string

  constructor(
    { linkUrl, tracks, dispatch, canFullPlayAppleMusic }:
    {
      linkUrl: string,
      tracks: Track[],
      dispatch?: React.Dispatch<ActionType>,
      canFullPlayAppleMusic: boolean
    }
  ){
    let _players:[PreviewPlayer?, AppleMusicPlayer?] = []
    if(dispatch) {
      _players.push(new PreviewPlayer({ dispatch }))

      if(canFullPlayAppleMusic) {
        _players.push(new AppleMusicPlayer({ dispatch }))
      }
    }
    this.players = _players.reverse() as [AppleMusicPlayer?, PreviewPlayer?]
    this.currentPlaybackNo = 0
    this.tracks = tracks
    this.dispatch = dispatch
    this.linkUrl = linkUrl
  }

  currentTrack() {
    return this.tracks[this.currentPlaybackNo]
  }

  async play(no?:number) {
    this.currentPlaybackNo = no ?? this.currentPlaybackNo
    const isLastTrack = (this.tracks.length - 1) === this.currentPlaybackNo
    this.player().play(this.currentPlaybackNo, this.currentTrack(), isLastTrack)
  }

  // 再生可能なプレイヤーを取得
  player(): PreviewPlayer | AppleMusicPlayer {
     const _player = this.players.find(p => p && p.canPlay(this.currentTrack())) as PreviewPlayer | AppleMusicPlayer
     // 前回のプレイヤーが別の場合はリセット
     if(this.currentPlyer && this.currentPlyer.constructor.name !== _player.constructor.name) this.stop()
     this.currentPlyer = _player
     return _player
  }

  async nextPlay() {
    const nextNo = this.currentPlaybackNo + 1
    if((this.tracks.length - 1) < nextNo) {
      // プレイリスト最後の曲
      this.dispatch && this.dispatch({ type: "STATUS_FINISH" })
    } else {
      this.currentPlaybackNo = nextNo
      await this.play()
    }
  }

  async pause() {
    this.players.forEach(p => p?.pause(this.currentPlaybackNo))
  }

  async stop() {
    this.players.forEach(p => p?.stop(this.currentPlaybackNo))
  }

  async finish() {
    this.stop()
    this.currentPlaybackNo = 0
  }
}

export default Player
