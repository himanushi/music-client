import React from 'react';
import { Artist, StatusEnum } from '../../../graphql/types.d';
import ImageCardComponent from '../../../components/imageCard/ImageCardComponent';
import { ParameterKeys, ParameterPrefixKeys } from '../../../hooks/useParameters';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import FavoriteComponent from '../../../components/favorite/FavoriteComponent';

const ArtistItemLayout = (
  { artist, width }:
  { artist: Artist, width: number }
) => {
  // クエリパラメータ引き継ぎ
  let history = useHistory()
  const params = new URLSearchParams(history.location.search)
  params.set(ParameterPrefixKeys.album + ParameterKeys.ids, artist.id)
  // キーワード検索はいちいち検索されるので削除
  params.delete(ParameterPrefixKeys.album + ParameterKeys.keyword)
  params.delete(ParameterPrefixKeys.artist + ParameterKeys.keyword)
  const status = params.get(ParameterPrefixKeys.artist + ParameterKeys.status)
  // すでにアルバムステータスが設定されていた場合はそちらを優先する
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

  // ステータスをわかりやすいようにしておく
  const serviceIcons = []
  if(artist.status === StatusEnum.Pending){
    serviceIcons.push(<Grid key={10} item style={{...style, color: "#000", backgroundColor: "#FFFF00"}}>PN</Grid>)
  } else if (artist.status === StatusEnum.Ignore){
    serviceIcons.push(<Grid key={11} item style={{...style, color: "#000",backgroundColor: "#FF0000"}}>IG</Grid>)
  }
  const bottomComponent = <>{serviceIcons}</>

  return (
    <ImageCardComponent
      title={artist.name}
      src={artist.artworkM.url}
      width={width}
      linkUrl={`/artists/${artist.id}?${params.toString()}`}
      topComponent={<FavoriteComponent favorable_type="artist" favorable_id={artist.id} contentWidth={width} />}
      bottomComponent={bottomComponent}
    />
  )
}

export default ArtistItemLayout
