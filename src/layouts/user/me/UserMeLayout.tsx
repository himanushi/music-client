import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import { useMeQuery, useUpdateMeMutation, UpdateMePayload } from '../../../graphql/types.d';

const UserMeLayout = () => {
  const [notification, setNotification] = useState(<></>)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [input, setInput] = useState({})

  // カレントユーザーデフォルト値
  const { data } = useMeQuery()
  if(name === "" && username === "" && data && data.me){
    setName(data.me.name)
    setUsername(data.me.name)
  }
  // TODO: 適当すぎるので直すこと
  let role = [<></>]
  if(data && data.me){
    role = data.me.role.allowedActions.map((action) => {
        return <p>{action}</p>
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
            <InputLabel>パスワード再設定</InputLabel>
            <Input value={password} onChange={e => {
              setPassword(e.target.value || "")
              setInput({ ...input, password: (e.target.value || "") })
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
