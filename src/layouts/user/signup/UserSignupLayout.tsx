import React, { useState, useContext, useEffect } from 'react';
import { Grid, FormControl, InputLabel, Input, Button, Card, CardContent, FormControlLabel, Checkbox } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import { useMeQuery, useUpdateMeMutation, UpdateMePayload, UpdateMeInput, CurrentUser, useSignupMutation, SignupPayload, SignupInput } from '../../../graphql/types.d';
import UserContext from '../../../hooks/userContext';

const UserSignupLayout = () => {
  const [setup, setSetup] = useState(true)
  const [notification, setNotification] = useState(<></>)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [agreedPrivacy, setAgreedPrivacy] = useState(false)
  const [input, setInput] = useState<SignupInput>({ name, username, newPassword, oldPassword })
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
  interface SignupResponse {
    data: { signup: SignupPayload }
  }
  const [signup] = useSignupMutation({
    update: (_, response:SignupResponse) => {
      if (response.data.signup.error) {
        setNotification(<Alert severity="error">{response.data.signup.error}</Alert>)
      } else {
        dispatch({ type: "SET_USER", user: response.data.signup.currentUser as CurrentUser })
        setNotification(<Alert severity="success">登録しました</Alert>)
      }
    },
    variables: { input },
  })

  const buttonDisabled =
    !name || !username || !newPassword || !oldPassword || !agreedTerms || !agreedPrivacy

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
              <FormControl required={true}>
                <InputLabel>名前</InputLabel>
                <Input value={name} onChange={e => {
                  setName(e.target.value || "")
                  setInput({ ...input, name: (e.target.value || "") })
                }}/>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl required={true}>
                <InputLabel>ユーザーID</InputLabel>
                <Input value={username} onChange={e => {
                  setUsername(e.target.value || "")
                  setInput({ ...input, username: (e.target.value || "") })
                }}/>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl required={true}>
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
                  checked={agreedTerms}
                  color="secondary"
                  onChange={() => setAgreedTerms(!agreedTerms)}
                  name="terms"
                />}
                label="利用規約に同意する"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox
                  checked={agreedPrivacy}
                  color="secondary"
                  onChange={() => setAgreedPrivacy(!agreedPrivacy)}
                  name="privacy"
                />}
                label="プライバシーポリシーに同意する"
              />
            </Grid>
            <Grid item>
              <Button disabled={buttonDisabled} type="submit" onClick={(e) =>{e.preventDefault(); signup()}} variant="contained">登録する</Button>
            </Grid>
            <Grid item>{notification}</Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default UserSignupLayout
