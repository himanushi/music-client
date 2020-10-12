import React, { useContext } from 'react';
import { Snackbar, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import InformationContext from '../../hooks/informationContext';

const SnackbarComponent = () => {
  const { state, dispatch } = useContext(InformationContext)

  if(!state.severity) {
    return <></>
  }

  const defaultCloseHandler = () => {
    dispatch({ type: "CLOSE_ALERT" })
  }

  const action = (buttonText:string) =>
    <Button onClick={state.closeHandler || defaultCloseHandler} color="inherit" size="small">{buttonText}</Button>

  // クローズハンドラーの指定がある場合は非表示時間や他画面クリックでアラートが消えない
  const onCloseEvent = state.closeHandler ? {} : { onClose: defaultCloseHandler }

  return (
    <Snackbar style={{ bottom: "70px" }} open={state.open} autoHideDuration={state.duration} {...onCloseEvent}>
      <Alert severity={state.severity} action={action(state.buttonText)}>{state.text}</Alert>
    </Snackbar>
  )
}

export default SnackbarComponent
