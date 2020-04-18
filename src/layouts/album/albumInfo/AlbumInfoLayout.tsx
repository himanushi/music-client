import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Album, AlbumDocument } from '../../../graphql/types.d';
import { Grid } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<{ id?: string }>{}

const AlbumInfoLayout = ({ match }:Props) => {
  const { loading, error, data } =
    useQuery<{ album: Album | null }>(AlbumDocument,{ variables: { id: match.params.id } });

  if (error) return <div>{error.message}</div>

  let album_content = <></>

  if (loading || !data) {
    // todo
  } else {
    if(data.album) {
      let preview_content = <></>

      if(data.album.appleMusicAlbum) {
        preview_content =
          <iframe
            title={data.album.id}
            allow="autoplay *; encrypted-media *;"
            frameBorder="0"
            width="660"
            height="1000"
            style={{width:"100%", maxWidth:"660px", overflow:"hidden", background:"transparent"}}
            src={`https://embed.music.apple.com/jp/album/game/${data.album.appleMusicAlbum.appleMusicId}?app=music`}>
          </iframe>
      } else if(data.album.itunesAlbum) {
        preview_content =
          <iframe
            title={data.album.id}
            src={`https://tools.applemusic.com/embed/v1/album/${data.album.itunesAlbum.appleMusicId}?country=jp`}
            frameBorder="0"
            width="660"
            height="1000">
          </iframe>
      } else if(data.album.spotifyAlbum) {
        preview_content =
          <iframe
            title={data.album.id}
            src={`https://open.spotify.com/embed/album/${data.album.spotifyAlbum.spotifyId}`}
            width="660"
            height="1000"
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
