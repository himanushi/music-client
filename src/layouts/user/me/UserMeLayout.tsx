import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import { useMeQuery, useUpdateMeMutation, UpdateMePayload, UpdateMeInput } from '../../../graphql/types.d';

const UserMeLayout = () => {
  const [notification, setNotification] = useState(<></>)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [input, setInput] = useState<UpdateMeInput>({ oldPassword })

  // カレントユーザーデフォルト値
  const { data } = useMeQuery({ fetchPolicy: "network-only" })
  if(name === "" && username === "" && data && data.me){
    setName(data.me.name)
    setUsername(data.me.username)
  }
  // TODO: 適当すぎるので直すこと
  let role:JSX.Element[] = []
  if(data && data.me){
    role = data.me.role.allowedActions.map((action, i) => {
        return <p key={i}>{action}</p>
      }
    )
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
        <div>ID: {(data && data.me) ? data.me.id : ""}</div>
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
        <div>権限: {role}</div>
      </form>
    </Grid>
  )
}

export default UserMeLayout
