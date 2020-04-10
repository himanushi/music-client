import React from 'react';
import { Album } from '../../graphql/types.d';

const AlbumLayout = ({ album }:{ album: Album }) => {
  return (
  <div>{album.name}</div>
  )
}

export default AlbumLayout;
