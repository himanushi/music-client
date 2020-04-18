import React from 'react';
import { Album } from '../../../graphql/types.d';
import ImageCardComponent from '../../../components/imageCard/ImageCardComponent';
import ImageComponent from '../../../components/image/ImageComponent';

const AlbumItemLayout = (
  { album, width }:
  { album: Album, width:string|number }
) => {
  const serviceIcons = []
  if(album.appleMusicAlbum) serviceIcons.push(<span>A</span>)
  if(album.itunesAlbum) serviceIcons.push(<span>i</span>)
  if(album.spotifyAlbum) serviceIcons.push(<span>S</span>)
  const componentInImage = <>{serviceIcons}</>

  return (
    <ImageCardComponent
      title={album.name}
      src={album.artworkM.url}
      width={width}
      linkUrl={`/albums/${album.id}`}
      componentInImage={componentInImage}
    />
  )
}

export default AlbumItemLayout;
