import React, { useReducer, createContext } from 'react'

type ContextValue = {
  state: StateType
  dispatch: React.Dispatch<ActionType>
}

const PlayerContext = createContext({} as ContextValue)

const initialState = {
  playing: false,
}

type StateType = typeof initialState
type ActionType =
 | { type: 'PLAY' }
 | { type: 'STOP' }

const PlayerProvider = ({ children }:{ children:JSX.Element|JSX.Element[] }) => {
  // TODO: Reducer 増えたら分離させる
  const [state, dispatch] = useReducer((state:StateType, action:ActionType) => {
    switch(action.type) {
      case 'PLAY':
       return {
         ...state,
         playing: true
       }
      case 'STOP':
        return {
          ...state,
          playing: false
        }
      default:
        return state
    }
  }, initialState)

  return <PlayerContext.Provider value={{ state, dispatch }}>{children}</PlayerContext.Provider>
}

export default PlayerContext
export { PlayerProvider }
