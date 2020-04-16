import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ImageComponent from '../image/ImageComponent'
import TitleComponent from '../title/TitleComponent';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface Image {
  title: string
  src?: string | null
  width: string | number
  linkUrl: string
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
      <Card style={{ width: image.width }}>
        <ImageComponent src={image.src || ""} width={image.width}/>
        <CardContent style={{ padding: "10px" }} >
          <TitleComponent title={image.title} />
        </CardContent>
      </Card>
    </Grid>
  )
}

export default ImageCardComponent;
