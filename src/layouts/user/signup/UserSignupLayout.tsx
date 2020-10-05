import React, { useState, useContext } from 'react';
import { FormControl, InputLabel, Input, Button, FormControlLabel, Checkbox, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, FormHelperText } from '@material-ui/core';
import { CurrentUser, useSignupMutation, SignupPayload, SignupInput } from '../../../graphql/types.d';
import UserContext from '../../../hooks/userContext';
import { Link, useHistory } from 'react-router-dom';
import InformationContext from '../../../hooks/informationContext';

const UserSignupLayout = () => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [agreedPrivacy, setAgreedPrivacy] = useState(false)
  const [input, setInput] = useState<SignupInput>({ name, username, password, passwordConfirmation })
  const userContext = useContext(UserContext)
  const infoContext = useContext(InformationContext)

  let history = useHistory()

  if(userContext.state.user?.registered) {
    infoContext.dispatch({ type: "ADD_ALERT", severity: "info", duration: 5000, text: "登録済みです", buttonText: "OK" })
    history.push("/albums")
  }

  // カレントユーザー登録
  interface SignupResponse {
    data: { signup: SignupPayload }
  }
  const [signup] = useSignupMutation({
    update: (_, response:SignupResponse) => {
      if (response.data.signup.error) {
        infoContext.dispatch({ type: "ADD_ALERT", severity: "error", duration: 20000, text: response.data.signup.error, buttonText: "OK" })
      } else {
        userContext.dispatch({ type: "SET_USER", user: response.data.signup.currentUser as CurrentUser })
        infoContext.dispatch({ type: "ADD_ALERT", severity: "success", duration: 10000, text: <>登録しました。<br/>音楽を楽しみましょう！</>, buttonText: "OK" })
        history.push("/albums")
      }
    },
    variables: { input },
  })

  const buttonDisabled =
    !name || !username || !password || !passwordConfirmation || !agreedTerms || !agreedPrivacy

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ border: 'none' }}>ユーザー登録</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow >
            <TableCell align="center" style={{ border: 'none' }}>
              <FormControl required={true}>
                <InputLabel>名前</InputLabel>
                <Input value={name} onChange={e => {
                  setName(e.target.value || "")
                  setInput({ ...input, name: (e.target.value || "") })
                }}/>
                <FormHelperText>あとで変更可能</FormHelperText>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow >
             <TableCell align="center" style={{ border: 'none' }}>
              <FormControl required={true}>
                <InputLabel>ユーザーID</InputLabel>
                <Input value={username} onChange={e => {
                  setUsername(e.target.value || "")
                  setInput({ ...input, username: (e.target.value || "") })
                }}/>
                <FormHelperText>半角英数と_のみ, あとで変更不可</FormHelperText>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow >
            <TableCell align="center" style={{ border: 'none' }}>
              <FormControl required={true}>
                <InputLabel>パスワード設定</InputLabel>
                <Input value={password} onChange={e => {
                  setPassword(e.target.value || "")
                  setInput({ ...input, password: (e.target.value || "") })
                }} type="password" />
                <FormHelperText>あとで変更可能</FormHelperText>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow >
            <TableCell align="center">
              <FormControl required={true}>
                <InputLabel>再確認パスワード</InputLabel>
                <Input value={passwordConfirmation} onChange={e => {
                  setPasswordConfirmation(e.target.value || "")
                  setInput({ ...input, passwordConfirmation: (e.target.value || "") })
                }} type="password" />
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" style={{ border: 'none' }}>
              <FormControlLabel
                control={<Checkbox
                  checked={agreedTerms}
                  color="secondary"
                  onChange={() => setAgreedTerms(!agreedTerms)}
                  name="terms"
                />}
                label={<><Link to="/terms" target="_blank">利用規約</Link>に同意する</>}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">
              <FormControlLabel
                control={<Checkbox
                  checked={agreedPrivacy}
                  color="secondary"
                  onChange={() => setAgreedPrivacy(!agreedPrivacy)}
                  name="privacy"
                />}
                label={<><Link to="/privacy" target="_blank">プライバシーポリシー</Link>に同意する</>}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              <Button disabled={buttonDisabled} variant="contained" onClick={() => signup()}>登録する</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserSignupLayout
