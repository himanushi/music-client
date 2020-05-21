import React from 'react';
import { Album, StatusEnum } from '../../../graphql/types.d';
import ImageCardComponent from '../../../components/imageCard/ImageCardComponent';
import { Grid } from '@material-ui/core';
import { ParameterKeys, ParameterPrefixKeys } from '../../../hooks/useParameters';
import { useHistory } from 'react-router-dom';

const AlbumItemLayout = (
  { album, width }:
  { album: Album, width:string|number }
) => {
  // クエリパラメータ引き継ぎ
  let history = useHistory()
  const params = new URLSearchParams(history.location.search)
  params.set(ParameterPrefixKeys.artist + ParameterKeys.ids, album.id)
  const status = params.get(ParameterPrefixKeys.album + ParameterKeys.status)
  // すでにアーティストステータスが設定されていた場合はそちらを優先する
  if(status !== null && !params.get(ParameterPrefixKeys.album + ParameterKeys.status)) {
    params.set(ParameterPrefixKeys.album + ParameterKeys.status, status)
  }

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

  // ステータスをわかりやすいようにしておく
  if(album.status === StatusEnum.Pending){
    serviceIcons.push(<Grid key={10} item style={{...style, color: "#000", backgroundColor: "#FFFF00"}}>PN</Grid>)
  } else if (album.status === StatusEnum.Ignore){
    serviceIcons.push(<Grid key={11} item style={{...style, color: "#000",backgroundColor: "#FF0000"}}>IG</Grid>)
  }

  const componentInImage = <>{serviceIcons}</>

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
