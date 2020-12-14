import React, { useEffect, useState } from 'react'
import { Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { usePlaylistsLazyQuery } from '../../graphql/types.d'

const AddPlayerComponent = ({ open, onClose }:{ open: boolean, onClose: () => void }) => {
  const [load, { data }] = usePlaylistsLazyQuery({
    fetchPolicy: "cache-and-network"
  })

  useEffect(() => {
    if(!open) return
    load()
  }, [open])

  if(!data || !data.items) {
    return <></>
  }

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">プレイリストに追加</DialogTitle>
      <List>
        {
          data.items.map((item, i) =>
            <ListItem key={i} autoFocus button onClick={() => onClose()}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} />
            </ListItem>
          )
        }
      </List>
    </Dialog>
  );
}

export default AddPlayerComponent
