import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Skeleton from '@material-ui/lab/Skeleton';

const ImageComponent = ({
  className = "", src = "", title = "", width
}:{
  className?:string, src?:string, title?:string, width:string|number
}) => {
  return (
    <CardMedia
      className={className}
      image={src}
      title={title}
      style={{ width: width, height: width }}
    />
  )
}

export default ImageComponent;
