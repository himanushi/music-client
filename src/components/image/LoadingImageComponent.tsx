import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingImageComponent = ({ width }:{ width:string|number }) => {
  return (
    <Skeleton
      variant="rect"
      width={width}
      height={width}
    />
  )
}

export default LoadingImageComponent;
