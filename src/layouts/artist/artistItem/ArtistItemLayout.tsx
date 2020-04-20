import React from 'react';
import { Artist } from '../../../graphql/types.d';
import ImageCardComponent from '../../../components/imageCard/ImageCardComponent';

const ArtistItemLayout = (
  { artist, width }:
  { artist: Artist, width:string|number }
) => {
  const componentInImage = <span style={{ color: "black" }}>{artist.name}</span>

  return (
    <ImageCardComponent
      title={artist.name}
      src={artist.artworkM.url}
      width={width}
      linkUrl={`/albums?q=${artist.id}`}
      componentInImage={componentInImage}
    />
  )
}

export default ArtistItemLayout
