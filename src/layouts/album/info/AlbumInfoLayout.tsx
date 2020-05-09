import React from 'react';
import { useAlbumQuery } from '../../../graphql/types.d';
import { Grid, Tabs, Tab, Button, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import ArtistsLayout from '../../artist/list/ArtistsLayout';
import { red, green, blue } from '@material-ui/core/colors';

// TODO: このファイル汚すぎるのでリファクタすること

const AlbumInfoLayout = () => {
  const { id } = useParams()
  const { loading, error, data } = useAlbumQuery({ variables: { id: id } })
  const [index, setIndex] = React.useState<number|null>(null)

  if (error) return <div>{error.message}</div>

  let content = <></>

  const resize = (event: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    const target = event.target as HTMLIFrameElement
    target.style.width  = document.documentElement.scrollWidth + 'px';
    return event
  }

  if(!loading && data && data.album) {
    // default index
    if(null === index){
      if(data.album.appleMusicAlbum){
        setIndex(0)
      }else if(data.album.itunesAlbum){
        setIndex(1)
      }else if(data.album.spotifyAlbum){
        setIndex(2)
      }
    }

    // share button
    let button_contents:JSX.Element[] = []
    if(data.album.appleMusicAlbum){
      button_contents.push(
        <Grid item key={0}>
          <MuiThemeProvider theme={createMuiTheme({ palette: { primary: red } })}>
            <Button
              href={`https://music.apple.com/jp/album/${data.album.appleMusicAlbum.appleMusicId}`}
              target="_blank"
              variant="contained" color="primary"
            >
              Apple Music で聴く
            </Button>
          </MuiThemeProvider>
        </Grid>
      )
    }
    if(data.album.itunesAlbum){
      button_contents.push(
        <Grid item key={1}>
          <MuiThemeProvider theme={createMuiTheme({ palette: { primary: blue } })}>
            <Button
              href={`https://music.apple.com/jp/album/${data.album.itunesAlbum.appleMusicId}`}
              target="_blank"
              variant="contained" color="primary"
            >
              iTunes で聴く
            </Button>
          </MuiThemeProvider>
        </Grid>
      )
    }
    if(data.album.spotifyAlbum){
      button_contents.push(
        <Grid item key={2}>
          <MuiThemeProvider theme={createMuiTheme({ palette: { primary: green } })}>
            <Button
              href={`https://open.spotify.com/album/${data.album.spotifyAlbum.spotifyId}`}
              target="_blank"
              variant="contained" color="primary"
            >
              Spotify で聴く
            </Button>
          </MuiThemeProvider>
        </Grid>
      )
    }

    // view iframe
    let preview_content = <></>
    if(data.album.appleMusicAlbum && index === 0) {
      preview_content =
        <iframe
          onLoad={event=>resize(event)}
          title={data.album.id}
          allow="autoplay *; encrypted-media *;"
          width="300"
          height="500"
          frameBorder="0"
          style={{overflow:"hidden", background:"transparent"}}
          src={`https://embed.music.apple.com/jp/album/game/${data.album.appleMusicAlbum.appleMusicId}?app=music`}>
        </iframe>
    }

    if(data.album.itunesAlbum && index === 1) {
      preview_content =
        <iframe
          onLoad={event=>resize(event)}
          title={data.album.id}
          src={`https://tools.applemusic.com/embed/v1/album/${data.album.itunesAlbum.appleMusicId}?country=jp`}
          frameBorder="0"
          width="300"
          height="500">
        </iframe>
    }

    if(data.album.spotifyAlbum && index === 2) {
      preview_content =
        <iframe
          onLoad={event=>resize(event)}
          title={data.album.id}
          src={`https://open.spotify.com/embed/album/${data.album.spotifyAlbum.spotifyId}`}
          width="300"
          height="500"
          frameBorder="0"
          allow="encrypted-media">
        </iframe>
    }

    content =
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
        >
          <Grid item>
            {preview_content}
          </Grid>
          <Grid item>
            <Grid container spacing={1} direction="row">
              {button_contents}
            </Grid>
          </Grid>
          <Grid item>
            <Grid container>
              <ArtistsLayout />
            </Grid>
          </Grid>
      </Grid>
  }

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Tabs
          value={index || 0}
          onChange={(_event: React.ChangeEvent<{}>, newValue: number) => setIndex(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Apple Music" disabled={!data?.album?.appleMusicAlbum} />
          <Tab label="iTunes" disabled={!data?.album?.itunesAlbum}/>
          <Tab label="Spotify" disabled={!data?.album?.spotifyAlbum}/>
        </Tabs>
      </Grid>
      <Grid item>
        {content}
      </Grid>
    </Grid>
  )
}

export default AlbumInfoLayout
