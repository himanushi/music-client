import React, { useState, useContext, useEffect } from 'react';
import { FormControl, InputLabel, Input, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { useUpdateMeMutation, UpdateMePayload, UpdateMeInput, CurrentUser } from '../../../graphql/types.d';
import UserContext from '../../../hooks/userContext';
import { useHistory } from 'react-router-dom';
import InformationContext from '../../../hooks/informationContext';

const UserMeEditLayout = () => {
  const [setup, setSetup] = useState(true)
  const [name, setName] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [input, setInput] = useState<UpdateMeInput>({})
  const userContext = useContext(UserContext)
  const infoContext = useContext(InformationContext)
  let history = useHistory()

  // カレントユーザーデフォルト値
  useEffect(() => {
    if(userContext.state.user && setup){
      setSetup(false)
      setName(userContext.state.user.name)

      // 詳細情報はログに出しておく
      if(userContext.state.user){
        console.log({ id: userContext.state.user.id })
        console.log({ role: userContext.state.user.role.allowedActions })
      }
    }
  }, [userContext.state, setup])

  // カレントユーザー更新
  interface UpdateMeResponse {
    data: { updateMe: UpdateMePayload }
  }
  const [updateMe] = useUpdateMeMutation({
    update: (_, response:UpdateMeResponse) => {
      if (response.data.updateMe.error) {
        infoContext.dispatch({ type: "ADD_ALERT", severity: "error", duration: 20000, text: response.data.updateMe.error, buttonText: "OK" })
      } else {
        history.push("/me")
        userContext.dispatch({ type: "SET_USER", user: response.data.updateMe.currentUser as CurrentUser })
        infoContext.dispatch({ type: "ADD_ALERT", severity: "success", duration: 10000, text: "更新しました", buttonText: "OK" })
      }
    },
    variables: { input },
  })

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="center" style={{ border: 'none' }}>ユーザー情報更新</TableCell>
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
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} align="center">
              <Button onClick={() => updateMe()} variant="contained">更新する</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="center" style={{ border: 'none' }}>パスワード変更</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow >
            <TableCell align="center" style={{ border: 'none' }}>
              <FormControl required={true}>
                <InputLabel>旧パスワード</InputLabel>
                <Input value={oldPassword} onChange={e => {
                  setOldPassword(e.target.value || "")
                  setInput({ ...input, oldPassword: (e.target.value || "") })
                }} type="password" />
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow >
            <TableCell align="center" style={{ border: 'none' }}>
              <FormControl required={true}>
                <InputLabel>新パスワード</InputLabel>
                <Input value={newPassword} onChange={e => {
                  setNewPassword(e.target.value || "")
                  setInput({ ...input, newPassword: (e.target.value || "") })
                }} type="password" />
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow >
            <TableCell align="center" style={{ border: 'none' }}>
              <FormControl required={true}>
                <InputLabel>新パスワードの再確認</InputLabel>
                <Input value={passwordConfirmation} onChange={e => {
                  setPasswordConfirmation(e.target.value || "")
                  setInput({ ...input, passwordConfirmation: (e.target.value || "") })
                }} type="password" />
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} align="center">
              <Button onClick={() => updateMe()} variant="contained">変更する</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserMeEditLayout
