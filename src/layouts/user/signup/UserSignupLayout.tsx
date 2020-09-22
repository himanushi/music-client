import React, { useState, useContext, useEffect } from 'react';
import { Grid, FormControl, InputLabel, Input, Button, Card, CardContent, FormControlLabel, Checkbox } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import { useMeQuery, useUpdateMeMutation, UpdateMePayload, UpdateMeInput, CurrentUser } from '../../../graphql/types.d';
import UserContext from '../../../hooks/userContext';

const UserSignupLayout = () => {
  const [setup, setSetup] = useState(true)
  const [notification, setNotification] = useState(<></>)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [input, setInput] = useState<UpdateMeInput>({ oldPassword })
  const { state, dispatch } = useContext(UserContext)

  const recaptchaRef = React.createRef() // 追加

  // カレントユーザーデフォルト値
  useEffect(() => {
    if(state.user && setup){
      setSetup(false)
      setName(state.user.name)
      setUsername(state.user.username)

      // 詳細情報はログに出しておく
      if(state.user){
        console.log({ id: state.user.id })
        console.log({ role: state.user.role.allowedActions })
      }
    }
  }, [state, setup])

  // カレントユーザー更新
  interface UpdateMeResponse {
    data: { updateMe: UpdateMePayload }
  }
  const [updateMe] = useUpdateMeMutation({
    update: (_, response:UpdateMeResponse) => {
      if (response.data.updateMe.error) {
        setNotification(<Alert severity="error">{response.data.updateMe.error}</Alert>)
      } else {
        dispatch({ type: "SET_USER", user: response.data.updateMe.currentUser as CurrentUser })
        setNotification(<Alert severity="success">更新しました</Alert>)
      }
    },
    variables: { input },
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
                <InputLabel>名前</InputLabel>
                <Input value={name} onChange={e => {
                  setName(e.target.value || "")
                  setInput({ ...input, name: (e.target.value || "") })
                }}/>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel>ユーザー名</InputLabel>
                <Input value={username} onChange={e => {
                  setUsername(e.target.value || "")
                  setInput({ ...input, username: (e.target.value || "") })
                }}/>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel>パスワード</InputLabel>
                <Input value={newPassword} onChange={e => {
                  setNewPassword(e.target.value || "")
                  setInput({ ...input, newPassword: (e.target.value || "") })
                }} type="password" />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl required={true}>
                <InputLabel>再確認パスワード</InputLabel>
                <Input value={oldPassword} onChange={e => {
                  setOldPassword(e.target.value || "")
                  setInput({ ...input, oldPassword: (e.target.value || "") })
                }} type="password" />
              </FormControl>
            </Grid>
            <Grid item>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox
                  checked={true}
                  color="secondary"
                  // onChange={handleChange}
                  name="checkedF"
                />}
                label="利用規約に同意する"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox
                  checked={true}
                  color="secondary"
                  // onChange={handleChange}
                  name="checkedF"
                />}
                label="プライバシーポリシーに同意する"
              />
            </Grid>
            <Grid item>
              <Button type="submit" onClick={(e) =>{e.preventDefault(); updateMe()}} variant="contained">登録する</Button>
            </Grid>
            <Grid item>{notification}</Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default UserSignupLayout
