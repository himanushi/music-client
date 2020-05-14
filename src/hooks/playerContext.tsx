import React, { useReducer, createContext } from 'react'
import PreviewPlayer from '../components/player/PreviewPlayer'

type ContextValue = {
  state: StateType
  dispatch: React.Dispatch<ActionType>
}

const PlayerContext = createContext({} as ContextValue)

export enum PlaybackStatus {
  None, // 再生不可
  Play,
  Pause,
  Stop,
}

export enum LoadingStatus {
  None,
  Loading,
  Done,
}

const initialState = {
  player: new PreviewPlayer({ urls: [], tracks: [] }),
  currentNo: 0,
  currentTrackId: "",
  playbackStatus: PlaybackStatus.None,
  loadingStatus: LoadingStatus.None,
}

export type StateType = typeof initialState
export type ActionType =
  | { type: 'SET_PLAYER', player: PreviewPlayer }
  | { type: 'PLAY', no?: number }
  | { type: 'NEXT_PLAY' }
  | { type: 'PAUSE' }
  | { type: 'STOP' }
  | { type: 'LOADING_START' }
  | { type: 'LOADING_DONE' }

const PlayerProvider = ({ children }:{ children:JSX.Element|JSX.Element[] }) => {
  // TODO: Reducer 増えたら分離させる
  const [state, dispatch] = useReducer((state:StateType, action:ActionType):StateType => {
    switch(action.type) {
      case 'SET_PLAYER':
        state.player.stop()
        return {
          ...state,
          player: action.player,
          playbackStatus: PlaybackStatus.Stop,
        }
      case 'PLAY':
        state.player.play(action.no)
        return {
          ...state,
          playbackStatus: PlaybackStatus.Play,
          currentNo: action.no || state.currentNo,
        }
      case 'NEXT_PLAY':
        const no = state.player.nextPlay()
        return {
          ...state,
          playbackStatus: PlaybackStatus.Play,
        }
      case 'PAUSE':
        state.player.pause()
        return {
          ...state,
          playbackStatus: PlaybackStatus.Pause,
        }
      case 'STOP':
        state.player.stop()
        return {
          ...state,
          playbackStatus: PlaybackStatus.Play,
        }
      case 'LOADING_START':
        return {
          ...state,
          loadingStatus: LoadingStatus.Loading,
        }
      case 'LOADING_DONE':
        return {
          ...state,
          loadingStatus: LoadingStatus.Done,
        }
      default:
        return state
    }
  }, initialState)

  return <PlayerContext.Provider value={{ state, dispatch }}>{children}</PlayerContext.Provider>
}

export default PlayerContext
export { PlayerProvider }
