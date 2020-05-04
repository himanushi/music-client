import React from 'react';
import { Artist } from '../../../graphql/types.d';
import ImageCardComponent from '../../../components/imageCard/ImageCardComponent';

const ArtistItemLayout = (
  { artist, width }:
  { artist: Artist, width:string|number }
) => {
  return (
    <ImageCardComponent
      title={artist.name}
      src={artist.artworkM.url}
      width={width}
      linkUrl={`/artists/${artist.id}?q=${artist.id}`}
    />
  )
}

export default ArtistItemLayout
