import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';

const ImageComponent = ({
  className = "", src, title = ""
}:{
  className?:string, src:string, title?:string
}) => {
  return (
    <CardMedia
      className={className}
      image={src}
      title={title}
      style={{ width: "200px", height: "200px" }}
    />
  )
}

export default ImageComponent;
