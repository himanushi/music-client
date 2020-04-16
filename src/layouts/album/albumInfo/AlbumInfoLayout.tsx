import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Album, AlbumDocument } from '../../../graphql/types.d';
import LoadingAlbumItemLayout from '../albumItem/LoadingAlbumItemLayout';
import { Grid } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import AlbumItemLayout from '../albumItem/AlbumItemLayout';

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
            allow="autoplay *; encrypted-media *;"
            frameBorder="0"
            width="660"
            height="1000"
            style={{width:"100%", maxWidth:"660px", overflow:"hidden", background:"transparent"}}
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src={`https://embed.music.apple.com/jp/album/game/${data.album.appleMusicAlbum.appleMusicId}?app=music`}>
          </iframe>
      } else if(data.album.itunesAlbum) {
        preview_content =
          <iframe
            src={`https://tools.applemusic.com/embed/v1/album/${data.album.itunesAlbum.appleMusicId}?country=jp`}
            frameBorder="0"
            width="660"
            height="1000">
          </iframe>
      } else if(data.album.spotifyAlbum) {
        preview_content =
          <iframe
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
