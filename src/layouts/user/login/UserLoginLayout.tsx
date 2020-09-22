import React, { useState, useContext } from 'react';
import { Grid, FormControl, InputLabel, Input, Button, Card, CardContent } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import { useLoginMutation, LoginPayload, CurrentUser } from '../../../graphql/types.d';
import UserContext from '../../../hooks/userContext';

const UserLoginLayout = () => {
  const [notification, setNotification] = useState(<></>)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { state, dispatch } = useContext(UserContext)

  interface LoginResponse {
    data: { login: LoginPayload }
  }
  const [login] = useLoginMutation({
    update: (_, response:LoginResponse) => {
      if (response.data.login.error) {
        setNotification(<Alert severity="error">{response.data.login.error}</Alert>)
      } else {
        dispatch({ type: "SET_USER", user: response.data.login.currentUser as CurrentUser })
        setNotification(<Alert severity="success">ログインしました</Alert>)
      }
    },
    variables: { input: { username, password } },
  })

  return (
    <Card>
      <CardContent>
        <form autoComplete="off">
          <Grid
            container
            spacing={1}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <FormControl>
                <InputLabel>ユーザーID</InputLabel>
                <Input value={username} onChange={e => setUsername(e.target.value || "")}/>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel>パスワード</InputLabel>
                <Input value={password} onChange={e => setPassword(e.target.value || "")} type="password" />
              </FormControl>
            </Grid>
            <Grid item>
              <Button type="submit" onClick={(e) =>{e.preventDefault(); login()}} variant="contained">ログイン</Button>
            </Grid>
            <Grid item>{notification}</Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default UserLoginLayout
