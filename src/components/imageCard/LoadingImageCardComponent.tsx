import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LoadingImageComponent from '../image/LoadingImageComponent'
import LoadingTitleComponent from '../title/LoadingTitleComponent';
import { Grid } from '@material-ui/core';

const LoadingImageCardComponent = ({ width }:{ width:string|number }) => {
  return (
    <Grid item xs>
      <Card style={{ width: width }}>
        <LoadingImageComponent width={width} />
        <CardContent>
          <LoadingTitleComponent />
        </CardContent>
      </Card>
    </Grid>
  )
}

export default LoadingImageCardComponent
