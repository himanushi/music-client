import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';

const ImageComponent = ({
  className = "", src = "", title = "", width
}:{
  className?:string, src?:string, title?:string, width:string|number
}) => {
  if(src === "") src = `${process.env.PUBLIC_URL}/no_image.png`

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
