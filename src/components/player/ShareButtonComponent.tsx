import React from 'react';
import { Grid, Button, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { red, green, blue } from '@material-ui/core/colors';
import { Album } from '../../graphql/types.d'

const ShareButtonComponent = ({ album }:{ album:Album|null }) => {
  let contents:JSX.Element[] = []

  if(album?.appleMusicAlbum){
    contents.push(
      <Grid item key={0}>
        <MuiThemeProvider theme={createMuiTheme({ palette: { primary: red } })}>
          <Button
            href={`https://music.apple.com/jp/album/${album.appleMusicAlbum.appleMusicId}`}
            target="_blank"
            variant="contained" color="primary"
          >
            Apple Music で聴く
          </Button>
        </MuiThemeProvider>
      </Grid>
    )
  }

  if(album?.itunesAlbum){
    contents.push(
      <Grid item key={1}>
        <MuiThemeProvider theme={createMuiTheme({ palette: { primary: blue } })}>
          <Button
            href={`https://music.apple.com/jp/album/${album.itunesAlbum.appleMusicId}`}
            target="_blank"
            variant="contained" color="primary"
          >
            iTunes で聴く
          </Button>
        </MuiThemeProvider>
      </Grid>
    )
  }

  if(album?.spotifyAlbum){
    contents.push(
      <Grid item key={2}>
        <MuiThemeProvider theme={createMuiTheme({ palette: { primary: green } })}>
          <Button
            href={`https://open.spotify.com/album/${album.spotifyAlbum.spotifyId}`}
            target="_blank"
            variant="contained" color="primary"
          >
            Spotify で聴く
          </Button>
        </MuiThemeProvider>
      </Grid>
    )
  }

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="center"
      alignItems="center"
    >
      {contents}
    </Grid>
  )
}

export default ShareButtonComponent