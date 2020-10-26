import React, { useReducer, createContext, Dispatch } from 'react'
import Player from '../components/player/Player'

type ContextValue = {
  state: StateType
  dispatch: Dispatch<ActionType>
}

const PlayerContext = createContext({} as ContextValue)

export enum PlaybackStatus {
  None,
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
  player: new Player({ linkUrl: "", tracks: [] }),
  currentNo: 0,
  playbackStatus: PlaybackStatus.None,
  loadingStatus: LoadingStatus.Done,
}

export type StateType = {
  player: Player
  currentNo: number
  playbackStatus: PlaybackStatus
  loadingStatus: LoadingStatus
}

export type ActionType =
  | { type: 'SET_PLAYER', player: Player }
  | { type: 'PLAY', no?: number }
  | { type: 'NEXT_PLAY' }
  | { type: 'PAUSE' }
  | { type: 'STOP' }
  | { type: 'LOADING_START' }
  | { type: 'LOADING_DONE' }
  | { type: 'STATUS_FINISH' }

const reducer = (state:StateType, action:ActionType):StateType => {
  switch(action.type) {
    case 'SET_PLAYER':
      state.player.stop()
      return {
        ...state,
        player: action.player,
        playbackStatus: PlaybackStatus.Stop,
      }
    case 'PLAY':
      return {
        ...state,
        currentNo: state.player.play(action.no),
        playbackStatus: PlaybackStatus.Play,
      }
    case 'NEXT_PLAY':
      const currentNo = state.player.nextPlay()
      // currentNo が 0 ということは再生が終了したということになる
      const playbackStatus = currentNo === 0 ? PlaybackStatus.Stop : PlaybackStatus.Play
      return {
        ...state,
        currentNo,
        playbackStatus,
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
    case 'STATUS_FINISH':
      state.player.stop()
      return {
        ...state,
        currentNo: 0,
        playbackStatus: PlaybackStatus.Pause,
        loadingStatus: LoadingStatus.Done,
      }
    default:
      return state
  }
}

const PlayerProvider = ({ children }:{ children:JSX.Element|JSX.Element[] }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <PlayerContext.Provider value={{ state, dispatch }}>{children}</PlayerContext.Provider>
}

export default PlayerContext
export { PlayerProvider }
