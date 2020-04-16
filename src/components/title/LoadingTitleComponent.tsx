import React from 'react';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingTitleComponent = () => {
  return (
    <Typography align="left" variant="caption" color="textPrimary" component="h3">
      <Skeleton />
    </Typography>
  )
}

export default LoadingTitleComponent
