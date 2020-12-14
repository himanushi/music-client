import React, { createElement } from 'react';
import { Album, Playlist, StatusEnum } from '../../../graphql/types.d';
import ImageCardComponent from '../../../components/imageCard/ImageCardComponent';
import { Card, CardActionArea, CardContent, Grid, Typography } from '@material-ui/core';
import { ParameterKeys, ParameterPrefixKeys } from '../../../hooks/useParameters';
import { Link, useHistory } from 'react-router-dom';
import FavoriteComponent from '../../../components/favorite/FavoriteComponent';
import ImageComponent from '../../../components/image/ImageComponent';

const PlaylistItemLayout = (
  { playlist }:{ playlist: Playlist }
) => {
  const link = { component: Link, to: `/playlist/${playlist.id}` }

  return (
    createElement(Grid, {
      item: true, style: { textDecoration: "none" }, ...link,
      children: (
        <Card style={{ width: "290px", height: "70px" }}>
          <CardActionArea>
            <Grid container style={{ height: "70px" }}
              direction="row"
              justify="flex-start"
              alignItems="center">
              <Grid item>
                <ImageComponent src={playlist.track.artworkM.url || ""} width={70} title={playlist.name}/>
              </Grid>
              <Grid item>
                <Grid container
                  direction="column"
                  justify="center"
                  alignItems="flex-start"
                  style={{ height: "70px", padding: "10px 10px" }}>
                <Grid item>
                  <Typography
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "200px"
                    }} variant="caption" color="textPrimary" component="p">
                    {playlist.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "200px"
                  }} variant="caption" color="textSecondary" component="p">
                    作成者: { playlist.author ? playlist.author.name : "****" }
                </Typography>
                </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      )
    })
  )
}

export default PlaylistItemLayout
