import React from 'react';
import Card from '@material-ui/core/Card';
import ImageComponent from '../image/ImageComponent'
import { Grid, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface Image {
  title: string
  src?: string | null
  width: string | number
  linkUrl?: string
  componentInImage?: JSX.Element
}

const ImageCardComponent = (image:Image) => {
  const link = image.linkUrl ? { component: Link, to: image.linkUrl } : {}

  return (
    React.createElement(Grid, {
      container: true, item: true, xs: true,
      direction: "row", justify: "center", alignItems: "center",
      style: { textDecoration: "none" },
      ...link,
      children: (
        <Card style={{ width: image.width, position: "relative" }}>
          <CardActionArea>
            <Grid container style={{ position: "absolute", left: "5px", bottom: "5px" }}>
              { image.componentInImage ? image.componentInImage : <></> }
            </Grid>
            <ImageComponent src={image.src || ""} width={image.width} title={image.title}/>
          </CardActionArea>
          <CardContent style={{ padding: "5px 5px" }}>
            <Typography style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }} variant="caption" color="textSecondary" component="p">
              {image.title}
            </Typography>
          </CardContent>
        </Card>
      )
    })
  )
}

export default ImageCardComponent
