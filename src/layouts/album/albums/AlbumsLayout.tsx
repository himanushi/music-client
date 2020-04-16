import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { AlbumsDocument, AlbumsQuery, Album } from '../../../graphql/types.d';
import AlbumItemLayout from '../albumItem/AlbumItemLayout';
import LoadingAlbumItemLayout from '../albumItem/LoadingAlbumItemLayout';
import { Grid } from '@material-ui/core';

const AlbumsLayout = () => {
  const { loading, error, data } = useQuery<{ albums: Album[] }>(
    AlbumsDocument,
    {
      variables: {
        offset: 0,
        limit: 1000,
      }
    }
  )

  if (error) return <div>{error.message}</div>

  let albums_content = [<></>]

  if (loading || !data) {
    albums_content =
      [...Array(50)].map(
        (_, i) => <LoadingAlbumItemLayout width="150px" key={i} />
      )
  } else {
    albums_content =
      data.albums.map(
        (album, i) => <AlbumItemLayout album={album} width="150px" key={i} />
      )
  }

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justify="center"
      alignItems="center"
    >
      {albums_content}
    </Grid>
  )
}

export default AlbumsLayout;
