import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import { useLoginMutation, LoginPayload } from '../../../graphql/types.d';

const UserLoginLayout = () => {
  const [notification, setNotification] = useState(<></>)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  interface LoginResponse {
    data: { login: LoginPayload }
  }
  const [login] = useLoginMutation({
    update: (_, response:LoginResponse) => {
      if (response.data.login.error) {
        setNotification(<Alert severity="error">{response.data.login.error}</Alert>)
      } else {
        setNotification(<Alert severity="success">ログインしました</Alert>)
      }
    },
    variables: { input: { username, password } },
  })

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <form autoComplete="off">
        <div>
          <FormControl>
            <InputLabel>ユーザー名</InputLabel>
            <Input value={username} onChange={e => setUsername(e.target.value || "")}/>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel>パスワード</InputLabel>
            <Input value={password} onChange={e => setPassword(e.target.value || "")} type="password" />
          </FormControl>
        </div>
        <div>
          <Button type="submit" onClick={(e) =>{e.preventDefault(); login()}} variant="contained">ログイン</Button>
        </div>
        <div>{notification}</div>
      </form>
    </Grid>
  )
}

export default UserLoginLayout
