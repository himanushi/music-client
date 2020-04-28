import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import { useSigninMutation, SigninPayload } from '../../../graphql/types.d';

const UserSigninLayout = () => {
  const [notification, setNotification] = useState(<></>)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  interface SigninResponse {
    data: { signin: SigninPayload }
  }
  const [signin] = useSigninMutation({
    update: (_, response:SigninResponse) => {
      if (response.data.signin.error) {
        setNotification(<Alert severity="error">{response.data.signin.error}</Alert>)
      } else {
        setNotification(<Alert severity="success">ログインしました</Alert>)
      }
    },
    variables: { username, password },
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
          <Button type="submit" onClick={(e) =>{e.preventDefault(); signin()}} variant="contained">Signin</Button>
        </div>
        <div>{notification}</div>
      </form>
    </Grid>
  )
}

export default UserSigninLayout
