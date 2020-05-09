import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Artist, ArtistDocument } from '../../../graphql/types.d';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import AlbumsLayout from '../../album/list/AlbumsLayout';
import ImageCardComponent from '../../../components/imageCard/ImageCardComponent';

const ArtistInfoLayout = () => {
  const { id } = useParams()
  const { error, data } =
    useQuery<{ artist: Artist | null }>(ArtistDocument,{ variables: { id: id } })

  if (error) return <div>{error.message}</div>

  let content = <></>

  if (data && data.artist) {
    content =
      <Grid item>
        <ImageCardComponent
          title={data.artist.name}
          src={data.artist.artworkL.url}
          width={270}
        />
      </Grid>
  }

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justify="center"
      alignItems="center"
    >
      {content}
      <Grid item>
        <AlbumsLayout />
      </Grid>
    </Grid>
  )
}

export default ArtistInfoLayout
