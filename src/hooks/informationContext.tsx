import React, { useReducer, createContext, Dispatch } from 'react'

type ContextValue = {
  state: StateType
  dispatch: Dispatch<ActionType>
}

const InformationContext = createContext({} as ContextValue)

const initialState: {
  severity: "info" | "success" | "warning" | "error" | null
  duration: number | null
  text: string | JSX.Element
  buttonText: string
  open: boolean
  closeHandler?: (event: any) => void
} = {
  severity: null,
  duration: null,
  text: "",
  buttonText: "",
  open: false,
}

export type StateType = typeof initialState
export type ActionType =
  | { type: 'ADD_ALERT', severity: "info" | "success" | "warning" | "error" | null, duration: number | null, text: string | JSX.Element, buttonText: string, closeHandler?: (event: any) => void }
  | { type: 'CLOSE_ALERT' }

const reducer = (state:StateType, action:ActionType):StateType => {
  switch(action.type) {
    case 'ADD_ALERT':
      return {
        ...state,
        severity: action.severity,
        duration: action.duration,
        text: action.text,
        buttonText: action.buttonText,
        open: true,
        closeHandler: action.closeHandler
      }
    case 'CLOSE_ALERT':
      return {
        ...state,
        open: false
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
