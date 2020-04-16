import React from 'react';
import { Album } from '../../../graphql/types.d';
import ImageCardComponent from '../../../components/imageCard/ImageCardComponent';

const AlbumItemLayout = ({ album, width }:{ album: Album, width:string|number }) => {
  return (
    <ImageCardComponent
      title={album.name}
      src={album.artworkM.url}
      width={width}
      linkUrl={`/albums/${album.id}`}
    />
  )
}

export default AlbumItemLayout;
