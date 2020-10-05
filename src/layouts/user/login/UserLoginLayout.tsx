import React, { useState, useContext } from 'react';
import { FormControl, InputLabel, Input, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { useLoginMutation, LoginPayload, CurrentUser } from '../../../graphql/types.d';
import UserContext from '../../../hooks/userContext';
import InformationContext from '../../../hooks/informationContext';
import { useHistory } from 'react-router-dom';

const UserLoginLayout = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const userContext = useContext(UserContext)
  const infoContext = useContext(InformationContext)

  let history = useHistory()

  if(userContext.state.user?.registered) {
    infoContext.dispatch({ type: "ADD_ALERT", severity: "info", duration: 5000, text: "ログイン済みです", buttonText: "OK" })
    history.push("/albums")
  }

  interface LoginResponse {
    data: { login: LoginPayload }
  }
  const [login] = useLoginMutation({
    update: (_, response:LoginResponse) => {
      if (response.data.login.error) {
        infoContext.dispatch({ type: "ADD_ALERT", severity: "error", duration: 5000, text: response.data.login.error, buttonText: "OK" })
      } else {
        userContext.dispatch({ type: "SET_USER", user: response.data.login.currentUser as CurrentUser })
        infoContext.dispatch({ type: "ADD_ALERT", severity: "success", duration: 5000, text: "ログインしました。", buttonText: "OK" })
        history.push("/albums")
      }
    },
    variables: { input: { username, password } },
  })

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ border: 'none' }}>ログイン</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow >
            <TableCell align="center" style={{ border: 'none' }}>
              <FormControl required={true}>
                <InputLabel>ユーザーID</InputLabel>
                <Input value={username} onChange={e => setUsername(e.target.value || "")}/>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow >
             <TableCell align="center" style={{ border: 'none' }}>
              <FormControl required={true}>
                <InputLabel>パスワード</InputLabel>
                <Input value={password} onChange={e => setPassword(e.target.value || "")} type="password" />
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              <Button disabled={!username || !password} variant="contained" onClick={() => login()}>ログインする</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserLoginLayout
