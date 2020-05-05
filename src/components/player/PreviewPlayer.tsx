import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import ImageCardComponent from '../imageCard/ImageCardComponent';

interface Track {
  isrc:string
  name:string
  discNumber:number
  trackNumber:number
  durationMs:number
  previewUrl:string
}

interface Artwork {
  url?:string | null
  height?:string | number | null
  width?:string | number | null
}

interface Album {
  title:string
  releaseDate:Date
  totalTracks:number
  artwork:Artwork
  tracks:Track[]
}

const PreviewPlayer = ({ album }:{ album:Album }) => {
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

  const reducer = (accumulator:number, currentValue:number) => accumulator + currentValue
  const ms = album.tracks.map(track => track.durationMs).reduce(reducer)
  const [{ value: year },{ value: literal }] = new Intl.DateTimeFormat("jp", { year: 'numeric' }).formatToParts(album.releaseDate)
  const releaseYear = `${year}${literal}`

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3} style={{ border: 'none' }}>
              <ImageCardComponent src={album.artwork.url} width={album.artwork.width || "300px"}/>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" colSpan={3} style={{ border: 'none' }}>
              { album.title }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              { `${releaseYear}発売、${album.totalTracks}曲、${timeConversion(ms)}` }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>No.</TableCell>
            <TableCell>タイトル</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {album.tracks.map((track, i) => (
            <TableRow key={i}>
              <TableCell>再生</TableCell>
              <TableCell>{track.trackNumber}</TableCell>
              <TableCell>{track.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PreviewPlayer
