import React from 'react';
import { Album, useAlbumQuery } from '../../../graphql/types.d';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';

const AlbumInfoLayout = () => {
  const { id } = useParams()
  const { loading, error, data } = useAlbumQuery({ variables: { id: id } })

  if (error) return <div>{error.message}</div>

  let album_content = <></>

  const resize = (event: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    const target = event.target as HTMLIFrameElement
    target.style.width  = document.documentElement.scrollWidth + 'px';
    target.style.height = (document.documentElement.scrollHeight - 70) + 'px';
    return event
  }

  if (loading || !data) {
    // todo
  } else {
    if(data.album) {
      let preview_content = <></>

      if(data.album.appleMusicAlbum) {
        preview_content =
          <iframe
            onLoad={event=>resize(event)}
            title={data.album.id}
            allow="autoplay *; encrypted-media *;"
            frameBorder="0"
            width="660"
            height="500"
            style={{overflow:"hidden", background:"transparent"}}
            src={`https://embed.music.apple.com/jp/album/game/${data.album.appleMusicAlbum.appleMusicId}?app=music`}>
          </iframe>
      } else if(data.album.itunesAlbum) {
        preview_content =
          <iframe
            onLoad={event=>resize(event)}
            title={data.album.id}
            src={`https://tools.applemusic.com/embed/v1/album/${data.album.itunesAlbum.appleMusicId}?country=jp`}
            frameBorder="0"
            width="660"
            height="500">
          </iframe>
      } else if(data.album.spotifyAlbum) {
        preview_content =
          <iframe
            onLoad={event=>resize(event)}
            title={data.album.id}
            src={`https://open.spotify.com/embed/album/${data.album.spotifyAlbum.spotifyId}`}
            width="660"
            height="500"
            frameBorder="0"
            allowTransparency={true}
            allow="encrypted-media">
          </iframe>
      }
      album_content = <>
        {preview_content}
      </>
    }
  }

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justify="center"
      alignItems="center"
    >
      {album_content}
    </Grid>
  )
}

export default AlbumInfoLayout
