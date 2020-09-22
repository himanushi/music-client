import React, { useState, useEffect, useContext } from 'react';
import { Grid, FormControl, InputLabel, Input, Button, Card, CardContent } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import { useLogoutMutation, LogoutPayload, CurrentUser } from '../../../graphql/types.d';
import UserContext from '../../../hooks/userContext';

const UserLogoutLayout = () => {
  const [notification, setNotification] = useState(<></>)

  const { state, dispatch } = useContext(UserContext)

  interface LogoutResponse {
    data: { logout: LogoutPayload }
  }
  const [logout] = useLogoutMutation({
    update: (_, response:LogoutResponse) => {
      if (response.data.logout.error) {
        setNotification(<Alert severity="error">{response.data.logout.error}</Alert>)
      } else {
        dispatch({ type: "SET_USER", user: response.data.logout.currentUser as CurrentUser })
        setNotification(<Alert severity="success">ログアウトしました</Alert>)
      }
    },
    variables: { input: {} },
  })

  useEffect(() => {
    logout()
  }, [])

  return notification
}

export default UserLogoutLayout
