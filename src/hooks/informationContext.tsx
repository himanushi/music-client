import React, { useReducer, createContext, Dispatch } from 'react'
import { CurrentUser } from '../graphql/types.d'

type ContextValue = {
  state: StateType
  dispatch: Dispatch<ActionType>
}

const InformationContext = createContext({} as ContextValue)

const initialState: {
  severity: "info" | "success" | "warning" | "error" | null
  duration: number | null
  text: string
  buttonText: string
} = {
  severity: null,
  duration: null,
  text: "",
  buttonText: ""
}

export type StateType = typeof initialState
export type ActionType =
  | { type: 'ADD_ALERT' } & typeof initialState

const reducer = (state:StateType, action:ActionType):StateType => {
  switch(action.type) {
    case 'ADD_ALERT':
      return {
        ...state,
        severity: action.severity,
        duration: action.duration,
        text: action.text,
        buttonText: action.buttonText
      }
    default:
      return state
  }
}

const InformationProvider = ({ children }:{ children:JSX.Element|JSX.Element[] }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <InformationContext.Provider value={{ state, dispatch }}>{children}</InformationContext.Provider>
}

export default InformationContext
export { InformationProvider }
