import React from 'react';
import { useAlbumQuery } from '../../../graphql/types.d';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import ArtistsLayout from '../../artist/list/ArtistsLayout';
import PreviewPlayer from '../../../components/player/PreviewPlayer';

const AlbumInfoLayout = () => {
  const { id } = useParams()
  const { loading, error, data } = useAlbumQuery({ variables: { id: id } })

  if (error) return <div>{error.message}</div>

  let content = <></>

  if (!loading && data && data.album) {
    content = <PreviewPlayer
      album={{
        title: data.album.name,
        releaseDate: new Date(data.album.releaseDate),
        totalTracks: data.album.totalTracks,
        artwork: { url: data.album.artworkL.url, width: "300px" },
        tracks: data.album.tracks || []
      }}
    />
  }

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid>
        {content}
        <div style={{ padding: "4px 0" }} />
      </Grid>
      <ArtistsLayout />
    </Grid>
  )
}

export default AlbumInfoLayout
