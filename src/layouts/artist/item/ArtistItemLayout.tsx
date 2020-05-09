import React from 'react';
import { Artist, StatusEnum } from '../../../graphql/types.d';
import ImageCardComponent from '../../../components/imageCard/ImageCardComponent';
import { ParameterKeys, ParameterPrefixKeys } from '../../../hooks/useParameters';
import { Grid } from '@material-ui/core';

const ArtistItemLayout = (
  { artist, width }:
  { artist: Artist, width:string|number }
) => {
  const params = new URLSearchParams()
  params.set(ParameterPrefixKeys.album + ParameterKeys.ids, artist.id)

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

  // ステータスをわかりやすいようにしておく
  const serviceIcons = []
  if(artist.status === StatusEnum.Pending){
    serviceIcons.push(<Grid key={10} item style={{...style, color: "#000", backgroundColor: "#FFFF00"}}>PN</Grid>)
  } else if (artist.status === StatusEnum.Ignore){
    serviceIcons.push(<Grid key={11} item style={{...style, color: "#000",backgroundColor: "#FF0000"}}>IG</Grid>)
  }
  const componentInImage = <>{serviceIcons}</>

  return (
    <ImageCardComponent
      title={artist.name}
      src={artist.artworkM.url}
      width={width}
      linkUrl={`/artists/${artist.id}?${params.toString()}`}
      componentInImage={componentInImage}
    />
  )
}

export default ArtistItemLayout
