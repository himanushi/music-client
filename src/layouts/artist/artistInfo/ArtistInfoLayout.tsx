import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Artist, ArtistDocument } from '../../../graphql/types.d';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import AlbumsLayout from '../../album/albums/AlbumsLayout';
import ImageCardComponent from '../../../components/imageCard/ImageCardComponent';

const ArtistInfoLayout = () => {
  const { id } = useParams()
  const { error, data } =
    useQuery<{ artist: Artist | null }>(ArtistDocument,{ variables: { id: id } });

  if (error) return <div>{error.message}</div>

  let content = <></>

  if (data && data.artist) {
    content =
      <Grid>
        <ImageCardComponent
          title={data.artist.name}
          src={data.artist.artworkL.url}
          width={270}
        />
        <div style={{ padding: "4px 0" }} />
        <AlbumsLayout />
      </Grid>
  }

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justify="center"
      alignItems="center"
    >
      {content}
    </Grid>
  )
}

export default ArtistInfoLayout
