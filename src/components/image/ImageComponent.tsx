import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';

const ImageComponent = ( imageClass: "", imageSrc: "", title: "" ) => {
  return (
    <CardMedia
      className={imageClass}
      image={imageSrc}
      title={title}
    />
  )
}

export default ImageComponent;
