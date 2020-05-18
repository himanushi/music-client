import React, { useReducer, createContext, Dispatch } from 'react'
import { CurrentUser } from './../graphql/types.d'

type ContextValue = {
  state: StateType
  dispatch: Dispatch<ActionType>
}

const UserContext = createContext({} as ContextValue)

export enum SignInStatus {
  // User 情報が存在しない状態。ほとんどの場合は存在する
  SignOut,
  // User 情報が存在する状態
  SignIn,
}

// パスワード設定などの初期登録を行なっているか
export enum InitializeStatus {
  None,
  Done,
}

const initialState = {
  user: null,
  signInStatus: SignInStatus.SignOut,
  initializeStatus: InitializeStatus.None,
}

export type StateType = {
  user?: CurrentUser | null
  signInStatus: SignInStatus
  initializeStatus: InitializeStatus
}

export type ActionType =
  | { type: 'SIGN_IN', user?: CurrentUser | null }
  | { type: 'INIT_DONE' }

const reducer = (state:StateType, action:ActionType):StateType => {
  switch(action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        user: action.user,
        signInStatus: SignInStatus.SignIn,
      }
    case 'INIT_DONE':
      return {
        ...state,
        initializeStatus: InitializeStatus.Done,
      }
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
