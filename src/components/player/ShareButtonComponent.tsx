/// <reference path="../../hooks/useMusicKit/MusicKitV1.d.ts" />

import React, { useContext, useRef } from 'react';
import { Grid, Button, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { red, green, blue } from '@material-ui/core/colors';
import { Album, useAppleMusicTokenQuery } from '../../graphql/types.d'
import PlayerContext from '../../hooks/playerContext';
import useMusicKitAuthentication from '../../hooks/useMusicKit/useMusicKitAuthentication';
import initMusicKit from '../../hooks/useMusicKit/initMusicKit';
import useMusicKitReady from '../../hooks/useMusicKit/useMusicKitReady';

const ShareButtonComponent = ({ album }:{ album:Album|null }) => {
  const { dispatch } = useContext(PlayerContext)
  let contents:JSX.Element[] = []
  const { authentication, isAuthorized } = useMusicKitAuthentication()
  const { data } = useAppleMusicTokenQuery()
  const isReady = useMusicKitReady()
  const firstInitRef = useRef(true)
  if(!isReady && data && firstInitRef.current) {
    console.log("initMusicKit")
    initMusicKit({
      initConfig: {
        developerToken: data.appleMusicToken,
        app: {
          name: "Video Game Music Catalog",
          build: "0.0.1"
        }
      },
      countryCode: "jp"
    })
    firstInitRef.current = false
  }


  if(album?.appleMusicAlbum){
    contents.push(
      <Grid item key={0}>
        <MuiThemeProvider theme={createMuiTheme({ palette: { primary: red } })}>
          {
            isReady ?
            <Button
              // href={`https://music.apple.com/jp/album/${album.appleMusicAlbum.appleMusicId}`}
              // target="_blank"
              variant="contained" color="primary"
              onClick={() => {
                if(isAuthorized) {
                  if(album?.appleMusicAlbum?.appleMusicId) {
                    MusicKit.getInstance().addToLibrary(album.appleMusicAlbum.appleMusicId)
                  }
                } else {
                  dispatch({ type: "PAUSE" });
                  authentication.login();
                }
              }}
            >
              { isAuthorized ? "Apple Music のライブラリに追加" : "Apple Music にログイン" }
            </Button>
            :
            <Button
              href={`https://music.apple.com/jp/album/${album.appleMusicAlbum.appleMusicId}`}
              target="_blank"
              variant="contained" color="primary"
            >
              Apple Music で聴く
            </Button>
          }
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
            onClick={() => dispatch({ type: "PAUSE" })}
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
            onClick={() => dispatch({ type: "PAUSE" })}
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
