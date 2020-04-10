import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { AlbumsDocument, AlbumsQuery, Album } from '../../graphql/types.d';
import AlbumLayout from '../album/AlbumLayout';

interface AlbumResults {
  albums: Album[]
}

const AlbumsLayout = () => {
  const { loading, error, data } = useQuery<AlbumResults>(AlbumsDocument);

  if (error) return  <div>error</div>
  if (loading || !data) return <div>loading</div>

  return (
    <div>
      {data.albums.map((album, i) => { return <AlbumLayout album={album} key={i} /> })}
    </div>
  );
}

export default AlbumsLayout;
