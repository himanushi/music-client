import React from 'react';
import { Album } from '../../../graphql/types.d';
import ImageCardComponent from '../../../components/imageCard/ImageCardComponent';
import { Grid } from '@material-ui/core';
import { ParameterKeys, ParameterPrefixKeys } from '../../../hooks/useParameters';

const AlbumItemLayout = (
  { album, width }:
  { album: Album, width:string|number }
) => {
  const style = {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    fontSize: "10px",
    color: "#fff",
    lineHeight: "15px",
    textAlign: "center" as "center",
    background: "#000",
  }

  const serviceIcons = []
  if(album.appleMusicAlbum){
    serviceIcons.push(<Grid key={1} item style={{...style, backgroundColor: "#ff2f56"}}>A</Grid>)
  }
  if(album.itunesAlbum){
    serviceIcons.push(<Grid key={2} item style={{...style, backgroundColor: "#0070c9"}}>iT</Grid>)
  }
  if(album.spotifyAlbum){
    serviceIcons.push(<Grid key={3} item style={{...style, backgroundColor: "#1DB954"}}>S</Grid>)
  }
  const componentInImage = <>{serviceIcons}</>

  const params = new URLSearchParams()
  params.set(ParameterPrefixKeys.artist + ParameterKeys.ids, album.id)

  return (
    <ImageCardComponent
      title={album.name}
      src={album.artworkM.url}
      width={width}
      linkUrl={`/albums/${album.id}?${params.toString()}`}
      componentInImage={componentInImage}
    />
  )
}

export default AlbumItemLayout
