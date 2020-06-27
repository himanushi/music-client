import React, { useContext, useRef, useEffect } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Grid } from '@material-ui/core';
import ImageCardComponent from '../imageCard/ImageCardComponent';
import PreviewPlayer from './PreviewPlayer';
import ShareButtonComponent from './ShareButtonComponent';
import { Album } from '../../graphql/types.d'
import PlayerContext from '../../hooks/playerContext';
import { useLocation } from 'react-router-dom';
import PreviewPlayerItemComponent from './PreviewPlayerItemComponent';
import _ from 'lodash';

const PreviewPlayerComponent = ({ album }:{ album:Album }) => {
  const { dispatch } = useContext(PlayerContext)
  const location = useLocation()

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
    const description = `「${album.name}」の発売日は${releaseDate}です。収録曲数は${album.totalTracks}曲あり、全曲再生時間は約${timeConversion(ms)}です。`
    document.querySelector('meta[name="description"]')?.setAttribute("content", description)

    return () => document.querySelector('meta[name="description"]')?.setAttribute("content", "ゲーム音楽のポータルサイト")
  }, [album])

  // プレビュー画面表示時に初期化される
  const initPlayer = useRef<boolean>(true);
  const playAction = (no:number) => {
    if(initPlayer.current) {
      const _player = new PreviewPlayer({
        linkUrl: `${location.pathname}${location.search}`,
        tracks: album.tracks,
        dispatch
      })

      dispatch({ type: "SET_PLAYER", player: _player })
      initPlayer.current = false
    }
    console.log("dispatch PLAY")
    dispatch({ type: "PLAY", no })
  }

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
                <ImageCardComponent title={""} src={album.artworkL.url} width={"250px"}/>
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
              { `${releaseDate}発売、${album.totalTracks}曲、${timeConversion(ms)}` }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" colSpan={2}>
             <ShareButtonComponent album={album} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">試聴</TableCell>
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
