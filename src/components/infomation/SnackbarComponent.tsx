import React, { useContext } from 'react';
import { Snackbar, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import InformationContext from '../../hooks/informationContext';

const SnackbarComponent = () => {
  const action = (buttonText:string) =>
    <Button onClick={handleClose} color="inherit" size="small">{buttonText}</Button>
  const { state, dispatch } = useContext(InformationContext)

  if(!state.severity) {
    return <></>
  }

  const handleClose = () => {
    dispatch({ type: "CLOSE_ALERT" })
  }

  return (
    <Snackbar style={{ bottom: "70px" }} open={state.open} autoHideDuration={state.duration} onClose={handleClose}>
      <Alert severity={state.severity} action={action(state.buttonText)}>{state.text}</Alert>
    </Snackbar>
  )
}

export default SnackbarComponent
