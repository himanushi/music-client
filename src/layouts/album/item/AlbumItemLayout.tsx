import React from 'react';
import { Album } from '../../../graphql/types.d';
import ImageCardComponent from '../../../components/imageCard/ImageCardComponent';
import { Grid } from '@material-ui/core';

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
    serviceIcons.push(<Grid item style={{...style, backgroundColor: "#ff2f56"}}>A</Grid>)
  }
  if(album.itunesAlbum){
    serviceIcons.push(<Grid item style={{...style, backgroundColor: "#0070c9"}}>iT</Grid>)
  }
  if(album.spotifyAlbum){
    serviceIcons.push(<Grid item style={{...style, backgroundColor: "#1DB954"}}>S</Grid>)
  }
  const componentInImage = <>{serviceIcons}</>

  return (
    <ImageCardComponent
      title={album.name}
      src={album.artworkM.url}
      width={width}
      linkUrl={`/albums/${album.id}?q=${album.id}`}
      componentInImage={componentInImage}
    />
  )
}

export default AlbumItemLayout
