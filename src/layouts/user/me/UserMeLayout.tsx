import React, { useState, useContext } from 'react';
import { Grid, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import { useMeQuery, useUpdateMeMutation, UpdateMePayload, UpdateMeInput } from '../../../graphql/types.d';
import UserContext from '../../../hooks/userContext';

const UserMeLayout = () => {
  const [setup, setSetup] = useState(true)
  const [notification, setNotification] = useState(<></>)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [input, setInput] = useState<UpdateMeInput>({ oldPassword })
  const { state, dispatch } = useContext(UserContext)

  // カレントユーザーデフォルト値
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

  // カレントユーザー更新
  interface UpdateMeResponse {
    data: { updateMe: UpdateMePayload }
  }
  const [updateMe] = useUpdateMeMutation({
    update: (_, response:UpdateMeResponse) => {
      if (response.data.updateMe.error) {
        setNotification(<Alert severity="error">{response.data.updateMe.error}</Alert>)
      } else {
        setNotification(<Alert severity="success">更新しました</Alert>)
      }
    },
    variables: { input },
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
            <InputLabel>名前</InputLabel>
            <Input value={name} onChange={e => {
              setName(e.target.value || "")
              setInput({ ...input, name: (e.target.value || "") })
            }}/>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel>ユーザー名</InputLabel>
            <Input value={username} onChange={e => {
              setUsername(e.target.value || "")
              setInput({ ...input, username: (e.target.value || "") })
            }}/>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel>新しいパスワード</InputLabel>
            <Input value={newPassword} onChange={e => {
              setNewPassword(e.target.value || "")
              setInput({ ...input, newPassword: (e.target.value || "") })
            }} type="password" />
          </FormControl>
        </div>
        <div>
          <FormControl required={true}>
            <InputLabel>古いパスワード</InputLabel>
            <Input value={oldPassword} onChange={e => {
              setOldPassword(e.target.value || "")
              setInput({ ...input, oldPassword: (e.target.value || "") })
            }} type="password" />
          </FormControl>
        </div>
        <div>
          <Button type="submit" onClick={(e) =>{e.preventDefault(); updateMe()}} variant="contained">Update</Button>
        </div>
        <div>{notification}</div>
      </form>
    </Grid>
  )
}

export default UserMeLayout
