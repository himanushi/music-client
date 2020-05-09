import React from 'react';
import { Artist } from '../../../graphql/types.d';
import ImageCardComponent from '../../../components/imageCard/ImageCardComponent';
import { ParameterKeys, ParameterPrefixKeys } from '../../../hooks/useParameters';

const ArtistItemLayout = (
  { artist, width }:
  { artist: Artist, width:string|number }
) => {
  const params = new URLSearchParams()
  params.set(ParameterPrefixKeys.album + ParameterKeys.ids, artist.id)

  return (
    <ImageCardComponent
      title={artist.name}
      src={artist.artworkM.url}
      width={width}
      linkUrl={`/artists/${artist.id}?${params.toString()}`}
    />
  )
}

export default ArtistItemLayout
