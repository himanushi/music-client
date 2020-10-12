import React, { useState, useContext } from 'react';
import { Button, TableContainer, Paper, Table, TableBody, TableRow, TableCell, TableHead, ClickAwayListener, Tooltip, IconButton } from '@material-ui/core';
import UserContext from '../../../hooks/userContext';
import { Link } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';

const UserMeLayout = () => {
  const { state } = useContext(UserContext)

  const [openInfoPublicInformation, setOpenInfoPublicInformation] = useState(false)
  const [openInfoMusicServiceLogin, setOpenInfoMusicServiceLogin] = useState(false)

  const publicTypes = state.user?.publicInformations?.map(p=>p.publicType) || []
  const publicArtist = publicTypes.includes("artist") ? "公開する" : "公開しない"
  const publicAlbum  = publicTypes.includes("album") ? "公開する" : "公開しない"

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="center" style={{ border: 'none' }}>ユーザー情報</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow >
            <TableCell align="right" style={{ border: 'none' }}>ユーザー名</TableCell>
            <TableCell align="left" style={{ border: 'none' }}>{state.user?.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" style={{ border: 'none' }}>ユーザーID</TableCell>
            <TableCell align="left" style={{ border: 'none' }}>{state.user?.username}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">権限</TableCell>
            <TableCell align="left">{state.user?.role.description}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="center" style={{ border: 'none' }}>
              公開情報
              <ClickAwayListener onClickAway={()=>setOpenInfoPublicInformation(false)}>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={()=>setOpenInfoPublicInformation(false)}
                  open={openInfoPublicInformation}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  placement="top"
                  title="お気に入りが公開できます。"
                >
                  <IconButton size="small" onClick={()=>setOpenInfoPublicInformation(true)}>
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ClickAwayListener>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="right" style={{ border: 'none' }}>好きなアーティスト</TableCell>
            <TableCell align="left" style={{ border: 'none' }}>{publicArtist}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">好きなアルバム</TableCell>
            <TableCell align="left">{publicAlbum}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="center" style={{ border: 'none' }}>
              音楽サービス連携
              <ClickAwayListener onClickAway={()=>setOpenInfoMusicServiceLogin(false)}>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={()=>setOpenInfoMusicServiceLogin(false)}
                  open={openInfoMusicServiceLogin}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  placement="top"
                  title="開発中。ログインするとフル再生とライブラリ追加ができるようになります。"
                >
                  <IconButton size="small" onClick={()=>setOpenInfoMusicServiceLogin(true)}>
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ClickAwayListener>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="right" style={{ border: 'none' }}>Apple Music</TableCell>
            <TableCell align="left" style={{ border: 'none' }}>未ログイン</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Spotify</TableCell>
            <TableCell align="left">未ログイン</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="center">
              <Button component={Link} to={"/me/edit"} variant="contained">更新する</Button>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  )
}

export default UserMeLayout
