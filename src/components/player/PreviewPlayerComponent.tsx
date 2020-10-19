import React, { useContext, useRef, useEffect, useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Grid, Tooltip, ClickAwayListener, IconButton, Typography } from '@material-ui/core';
import ImageCardComponent from '../imageCard/ImageCardComponent';
import MusicServiceButtonComponent from './MusicServiceButtonComponent';
import { Album } from '../../graphql/types.d'
import PlayerContext from '../../hooks/playerContext';
import { useLocation } from 'react-router-dom';
import PreviewPlayerItemComponent from './PreviewPlayerItemComponent';
import InfoIcon from '@material-ui/icons/Info';
import _ from 'lodash';
import ShareButtonComponent from './ShareButtonComponent';
import FavoriteComponent from '../favorite/FavoriteComponent';
import useMusicKitAuthentication from '../../hooks/useMusicKit/useMusicKitAuthentication';
import Player from './Player';

const PreviewPlayerComponent = ({ album }:{ album:Album }) => {
  const { dispatch } = useContext(PlayerContext)
  const location = useLocation()
  const [openInfo, setOpenInfo] = useState(false)

  const timeConversion = (ms:number) => {
    const seconds = parseInt((ms / 1000).toFixed(0))
    const minutes = parseInt((ms / (1000 * 60)).toFixed(0))
    const hours = parseInt((ms / (1000 * 60 * 60)).toFixed(0))
    const days = parseInt((ms / (1000 * 60 * 60 * 24)).toFixed(0))

    if (seconds < 60) {
        return seconds + "秒";
    } else if (minutes < 60) {
        return minutes + "分";
    } else if (hours < 24) {
        return hours + "時間";
    } else {
        return days + "日"
    }
  }

  // アルバム情報
  const reducer = (accumulator:number, currentValue:number) => accumulator + currentValue
  const ms = album.tracks.map(track => track.durationMs).reduce(reducer)
  const releaseDate = (new Date(album.releaseDate)).toLocaleDateString("jp", { year: 'numeric', month: 'long', day: 'numeric' })

  // SEO対策
  useEffect(() => {
    let description = `「${album.name}」の発売日は${releaseDate}です。収録曲数は${album.totalTracks}曲あり、全曲再生時間は約${timeConversion(ms)}です。`
    description += `収録曲は、${album.tracks.map((track)=>track.name).join(', ')}です。`
    document.querySelector('meta[name="description"]')?.setAttribute("content", description)

    return () => document.querySelector('meta[name="description"]')?.setAttribute("content", "音楽サブスクリプション配信中のゲーム音楽のポータルサイト")
  }, [album, ms, releaseDate])

  // 音楽サービスログイン
  const { isAuthorized } = useMusicKitAuthentication()
  const hasAppleMusicAlbum = !!album.appleMusicAlbum

  // プレビュー画面表示時に初期化される
  const initPlayer = useRef<boolean>(true);
  const playAction = (no:number) => {
    if(initPlayer.current) {
      const _player = new Player({
        linkUrl: `${location.pathname}${location.search}`,
        tracks: album.tracks,
        dispatch,
        canFullPlayAppleMusic: hasAppleMusicAlbum && isAuthorized
      })

      dispatch({ type: "SET_PLAYER", player: _player })
      initPlayer.current = false
    }
    dispatch({ type: "PLAY", no })
  }

  // 視聴音楽出典元
  let previewUrlFromService = ""
  if(album.appleMusicAlbum) {
    previewUrlFromService = "Apple Music"
  } else if(album.itunesAlbum) {
    previewUrlFromService = "iTunes"
  } else if(album.spotifyAlbum) {
    previewUrlFromService = "Spotify"
  }

  const previewOrPlayLabel =
    <>
      { (hasAppleMusicAlbum && isAuthorized) ? "再生" : "視聴" }
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
          title={ isAuthorized ? "AppleMusic によるストリーミング再生" : `${previewUrlFromService} のプレビューURLによるストリーミング試聴` }
        >
          <IconButton size="small" onClick={()=>setOpenInfo(true)}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </ClickAwayListener>
    </>

  // 人気度平均
  const averagePopularity = _.meanBy(album.tracks, (t) => t.popularity)

  return (
    <TableContainer component={Paper} style={{ maxWidth: "600px" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2} style={{ border: 'none' }}>
              <Grid
                container
                justify="center"
                alignItems="center"
              >
                <ImageCardComponent title={""} src={album.artworkL.url} width={250}
                  topComponent={<FavoriteComponent favorable_type="album" favorable_id={album.id} contentWidth={250} />}
                />
              </Grid>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" colSpan={2} style={{ border: 'none' }}>
              { album.name }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" colSpan={2} style={{ border: 'none' }}>
             <Typography color="textSecondary" variant="caption">
               { album.copyright }
             </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" colSpan={2} style={{ border: 'none' }}>
              { `${releaseDate}発売、${album.totalTracks}曲、${timeConversion(ms)}` }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" colSpan={2} style={{ border: 'none' }}>
              <ShareButtonComponent album={album} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              <MusicServiceButtonComponent album={album} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ width: 100 }} align="center">
              {previewOrPlayLabel}
            </TableCell>
            <TableCell>タイトル</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {album.tracks.map((track, i) => {
            return <PreviewPlayerItemComponent
              key={i}
              track={track}
              index={i}
              playAction={playAction}
              averagePopularity={averagePopularity}
            />
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PreviewPlayerComponent
