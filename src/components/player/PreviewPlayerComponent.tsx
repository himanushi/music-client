import React, { useEffect, useState, useContext } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton } from '@material-ui/core';
import ImageCardComponent from '../imageCard/ImageCardComponent';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PreviewPlayer from './PreviewPlayer';
import ShareButtonComponent from './ShareButtonComponent';
import { Album } from '../../graphql/types.d'

const PreviewPlayerComponent = ({ album }:{ album:Album }) => {
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
  const [{ value: year },{ value: literal }] =
    new Intl.DateTimeFormat("jp", { year: 'numeric' }).formatToParts(new Date(album.releaseDate))
  const releaseYear = `${year}${literal}`

  // プレイヤー
  const [player, setPlayer] = useState<PreviewPlayer|null>(null);
  const play = (no:number) => {
    if(player) player.play(no)
  }

  useEffect(() => {
    if(!player) {
      setPlayer(new PreviewPlayer({ urls: album.tracks.map(track => track.previewUrl) }))
    }

    return () => {
      player?.stop()
    }
  }, [player])

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={6} style={{ border: 'none' }}>
              <ImageCardComponent title={""} src={album.artworkL.url} width={"300px"}/>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" colSpan={6} style={{ border: 'none' }}>
              { album.name }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" colSpan={6} style={{ border: 'none' }}>
              { `${releaseYear}発売、${album.totalTracks}曲、${timeConversion(ms)}` }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" colSpan={6}>
             <ShareButtonComponent album={album} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">試聴</TableCell>
            <TableCell>No.</TableCell>
            <TableCell>タイトル</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {album.tracks.map((track, i) => {
            // TODO: あまり意味のある数値ではないのでアルバムの中の平均からスターをつける
            const star = track.popularity > 5 ? "★" : ""
            const durationTime = new Date(0)
            durationTime.setSeconds(track.durationMs / 1000)
            const duration = durationTime.toISOString().substr(14, 5)

            return <TableRow key={i}>
              <TableCell>{star}</TableCell>
              <TableCell>
                <IconButton onClick={() => play(i)} component="span">
                  <PlayArrowIcon />
                </IconButton>
              </TableCell>
              <TableCell>{track.trackNumber}</TableCell>
              <TableCell>{track.name}</TableCell>
              <TableCell align="right">{duration}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PreviewPlayerComponent
