import React, { useState, useContext, useEffect, useRef } from 'react';
import { FormControl, InputLabel, Input, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { useLoginMutation, LoginPayload, CurrentUser } from '../../../graphql/types.d';
import UserContext from '../../../hooks/userContext';
import InformationContext from '../../../hooks/informationContext';
import { useHistory } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

const UserLoginLayout = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const userContext = useContext(UserContext)
  const infoContext = useContext(InformationContext)
  let history = useHistory()

  const [token, setToken] = useState("")
  const recaptchaRef = useRef<ReCAPTCHA>() as React.RefObject<ReCAPTCHA>

  useEffect(() => {
    if(token) document.cookie = `reCAPTCHAv2Token=${token}; max-age=300; path=/;`
    return () => { document.cookie = `reCAPTCHAv2Token=; max-age=300; path=/;` }
  }, [token])

  // ログイン済みの場合はリターン
  useEffect(() => {
    if(userContext.state.user?.registered) {
      history.push("/albums")
      infoContext.dispatch({ type: "ADD_ALERT", severity: "info", duration: 5000, text: "ログイン済みです", buttonText: "OK" })
    }
  }, [userContext, infoContext, history])

  interface LoginResponse {
    data: { login: LoginPayload }
  }
  const [login] = useLoginMutation({
    update: (_, response:LoginResponse) => {
      if (response.data.login.error) {
        recaptchaRef?.current?.reset()
        infoContext.dispatch({ type: "ADD_ALERT", severity: "error", duration: 5000, text: response.data.login.error, buttonText: "OK" })
      } else {
        history.push("/albums")
        userContext.dispatch({ type: "SET_USER", user: response.data.login.currentUser as CurrentUser })
        infoContext.dispatch({ type: "ADD_ALERT", severity: "success", duration: 5000, text: "ログインしました。", buttonText: "OK" })
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
          <TableRow >
            <TableCell align="center" style={{ border: 'none' }}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.REACT_APP_RECAPTCHA_KEY || ""}
                onChange={_token => setToken(_token as string)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              <Button disabled={!username || !password || !token} variant="contained" onClick={() => login()}>ログインする</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserLoginLayout
