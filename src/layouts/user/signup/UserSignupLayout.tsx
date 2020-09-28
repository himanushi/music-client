import React, { useState, useContext } from 'react';
import { FormControl, InputLabel, Input, Button, FormControlLabel, Checkbox, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, FormHelperText } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import { CurrentUser, useSignupMutation, SignupPayload, SignupInput } from '../../../graphql/types.d';
import UserContext from '../../../hooks/userContext';
import { Link, useHistory } from 'react-router-dom';

const UserSignupLayout = () => {
  const [notification, setNotification] = useState(<></>)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [agreedPrivacy, setAgreedPrivacy] = useState(false)
  const [input, setInput] = useState<SignupInput>({ name, username, newPassword, oldPassword })
  const { dispatch } = useContext(UserContext)

  let history = useHistory()

  // カレントユーザー登録
  interface SignupResponse {
    data: { signup: SignupPayload }
  }
  const [signup] = useSignupMutation({
    update: (_, response:SignupResponse) => {
      if (response.data.signup.error) {
        setNotification(<Alert severity="error">{response.data.signup.error}</Alert>)
      } else {
        dispatch({ type: "SET_USER", user: response.data.signup.currentUser as CurrentUser })
        history.push("/albums")
      }
    },
    variables: { input },
  })

  const buttonDisabled =
    !name || !username || !newPassword || !oldPassword || !agreedTerms || !agreedPrivacy

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
                <FormHelperText>半角英数のみ, あとで変更不可</FormHelperText>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow >
            <TableCell align="center" style={{ border: 'none' }}>
              <FormControl required={true}>
                <InputLabel>パスワード設定</InputLabel>
                <Input value={newPassword} onChange={e => {
                  setNewPassword(e.target.value || "")
                  setInput({ ...input, newPassword: (e.target.value || "") })
                }} type="password" />
                <FormHelperText>あとで変更可能</FormHelperText>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow >
            <TableCell align="center">
              <FormControl required={true}>
                <InputLabel>再確認パスワード</InputLabel>
                <Input value={oldPassword} onChange={e => {
                  setOldPassword(e.target.value || "")
                  setInput({ ...input, oldPassword: (e.target.value || "") })
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
