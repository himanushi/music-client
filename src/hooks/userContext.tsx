import React, { useReducer, createContext, Dispatch } from 'react'
import { CurrentUser } from '../graphql/types.d'

type ContextValue = {
  state: StateType
  dispatch: Dispatch<ActionType>
}

const UserContext = createContext({} as ContextValue)

const initialState:{ user: null | CurrentUser } = {
  user: null
}

export type StateType = typeof initialState
export type ActionType =
  | { type: 'SET_USER', user: CurrentUser }

const reducer = (state:StateType, action:ActionType):StateType => {
  switch(action.type) {
    case 'SET_USER':
      return { ...state, user: action.user }
    default:
      return state
  }
}

const UserProvider = ({ children }:{ children:JSX.Element|JSX.Element[] }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>
}

export default UserContext
export { UserProvider }
