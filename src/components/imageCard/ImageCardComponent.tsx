import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ImageComponent from '../image/ImageComponent'
import TitleComponent from '../title/TitleComponent';
import { Grid, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface Image {
  title: string
  src?: string | null
  width: string | number
  linkUrl: string
  componentInImage?: JSX.Element
}

const ImageCardComponent = (image:Image) => {
  return (
    <Grid
      container item xs
      direction="row"
      justify="center"
      alignItems="center"
      component={Link} to={image.linkUrl}
    >
      <Card style={{ width: image.width, position: "relative" }}>
        <CardActionArea>
          <span style={{ position: "absolute", left: "5px", bottom: "5px" }}>
            { image.componentInImage ? image.componentInImage : <></> }
          </span>
          <ImageComponent src={image.src || ""} width={image.width}/>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default ImageCardComponent
