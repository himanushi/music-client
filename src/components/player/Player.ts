import { Track } from '../../graphql/types.d'
import { ActionType } from '../../hooks/playerContext'
import PreviewPlayer from './PreviewPlayer'
import AppleMusicPlayer from './AppleMusicPlayer'
import SpotifyPlayer from './SpotifyPlayer'

// 複数のプレイヤーをまとめる
class Player {
  currentPlyer?: PreviewPlayer | AppleMusicPlayer | SpotifyPlayer
  players: [AppleMusicPlayer?, SpotifyPlayer?, PreviewPlayer?]
  tracks: Track[]
  currentPlaybackNo: number
  dispatch?: React.Dispatch<ActionType>
  linkUrl: string

  constructor(
    { linkUrl, tracks, dispatch, canFullPlayAppleMusic, canFullPlaySpotify }:
    {
      linkUrl: string,
      tracks: Track[],
      dispatch?: React.Dispatch<ActionType>,
      canFullPlayAppleMusic?: boolean,
      canFullPlaySpotify?: boolean
    }
  ){
    let _players:[PreviewPlayer?, SpotifyPlayer?, AppleMusicPlayer?] = []
    if(dispatch) {
      _players.push(new PreviewPlayer({ dispatch }))

      if(canFullPlaySpotify) {
        _players.push(new SpotifyPlayer({ dispatch }))
      }
      if(canFullPlayAppleMusic) {
        _players.push(new AppleMusicPlayer({ dispatch }))
      }
    }
    this.players = _players.reverse() as [AppleMusicPlayer?, SpotifyPlayer?, PreviewPlayer?]
    this.currentPlaybackNo = 0
    this.tracks = tracks
    this.dispatch = dispatch
    this.linkUrl = linkUrl
  }

  currentTrack() {
    return this.tracks[this.currentPlaybackNo]
  }

  play(no?:number) {
    const playbackNo = no ?? this.currentPlaybackNo;

    // 再生した場合にエラーになる可能性もあるため優先順位順に実行してく
    (async () => {
      for (const player of this.players) {
        try {

          // 別の曲を再生した場合は停止する
          if(typeof no === "number") await this.stop()

          // エラーが出ない場合は正常に再生できていると判断する
          player && await player.play(playbackNo, this.currentTrack())
          break;
        } catch(e) {
          console.log(e)
        }
      }
    })()

    this.currentPlaybackNo = playbackNo
    return this.currentPlaybackNo
  }

  nextPlay() {
    const nextNo = this.currentPlaybackNo + 1
    if((this.tracks.length - 1) < nextNo) {
      // プレイリスト最後の曲
      this.currentPlaybackNo = 0
      this.stop()
    } else {
      this.currentPlaybackNo = nextNo
      // プレビュープレイヤーが存在しない曲は一旦再生しない
      if(!this.currentTrack().previewUrl) {
        this.nextPlay()
      } else {
        this.play(this.currentPlaybackNo)
      }
    }
    return this.currentPlaybackNo
  }

  async pause() {
    for (const player of this.players) {
      player && await player.pause(this.currentPlaybackNo)
    }
  }

  async stop() {
    for (const player of this.players) {
      player && await player.stop()
    }
  }
}

export default Player
