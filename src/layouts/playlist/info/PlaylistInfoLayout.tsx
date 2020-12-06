import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Playlist, usePlaylistQuery } from '../../../graphql/types.d';
import { ClickAwayListener, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@material-ui/core';
import { useLocation, useParams } from 'react-router-dom';
import ArtistsLayout from '../../artist/list/ArtistsLayout';
import PreviewPlayerComponent from '../../../components/player/PreviewPlayerComponent';
import ReactGA from 'react-ga';
import ImageCardComponent from '../../../components/imageCard/ImageCardComponent';
import FavoriteComponent from '../../../components/favorite/FavoriteComponent';
import ShareButtonComponent from '../../../components/player/ShareButtonComponent';
import MusicServiceButtonComponent from '../../../components/player/MusicServiceButtonComponent';
import PreviewPlayerItemComponent from '../../../components/player/PreviewPlayerItemComponent';
import InfoIcon from '@material-ui/icons/Info';
import useMusicKitAuthentication from '../../../hooks/useMusicKit/useMusicKitAuthentication';
import useSpotifyAuthentication from '../../../hooks/useSpotify/useSpotifyAuthentication';
import Player from '../../../components/player/Player';
import PlayerContext from '../../../hooks/playerContext';

const PlaylistInfoLayout = () => {
  const { id } = useParams<{ id:string }>()
  const { loading, error, data } = usePlaylistQuery({ variables: { id: id } })
  const [openInfo, setOpenInfo] = useState(false)
  const location = useLocation()
  const playerContext = useContext(PlayerContext)

  // 音楽サービスログイン
  const apple = useMusicKitAuthentication()
  const spotify = useSpotifyAuthentication()
  const initPlayer = useRef<boolean>(true)

  if (loading) return <div>loading...</div>
  if (error) return <div>{error.message}</div>
  if (!data || !data.playlist) return <div>Not Found ;(</div>

  const columnSize = 3
  const playlist = data.playlist as Playlist

  // プレビュー画面表示時に初期化される
  const playAction = (no:number) => {
    if(initPlayer.current) {
      const _player = new Player({
        linkUrl: `${location.pathname}${location.search}`,
        tracks: playlist.items.map(item=>item.track),
        dispatch: playerContext.dispatch,
        canFullPlayAppleMusic: apple.isAuthorized,
        canFullPlaySpotify: spotify.isAuthorized,
      })

      playerContext.dispatch({ type: "SET_PLAYER", player: _player })
      initPlayer.current = false
    }
    playerContext.dispatch({ type: "PLAY", no })
  }

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      justify="center"
      alignItems="center">
      <Grid item>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}>
          <Grid item>
            <TableContainer component={Paper} style={{ maxWidth: "600px" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={columnSize} style={{ border: 'none' }}>
                      <Grid
                        container
                        justify="center"
                        alignItems="center"
                      >
                        <ImageCardComponent title={""} src={playlist.track.artworkL.url} width={250}
                          topComponent={<FavoriteComponent favorable_type="playlist" favorable_id={playlist.id} contentWidth={250} />}
                        />
                      </Grid>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" colSpan={columnSize} style={{ border: 'none' }}>
                      { playlist.name }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" colSpan={columnSize}>
                      <Typography variant="body2" color="textSecondary">
                        { playlist.author ? `作成者: ${playlist.author.name}` : "" }
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: 50 }} align="center">
                    <ClickAwayListener onClickAway={()=>setOpenInfo(false)}>
                    <Tooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      onClose={()=>setOpenInfo(false)}
                      open={openInfo}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      placement="top-end"
                      title="Apple Music または Spotify によるストリーミング再生またはストリーミング視聴"
                      >
                        <IconButton size="small" onClick={()=>setOpenInfo(true)}>
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </ClickAwayListener>
                    </TableCell>
                    <TableCell>タイトル</TableCell>
                    <TableCell style={{ width: 50 }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {playlist.items.map((item, i) => {
                    return <PreviewPlayerItemComponent
                      key={i}
                      track={item.track}
                      index={i}
                      playAction={playAction}
                      averagePopularity={50}
                    />
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PlaylistInfoLayout
