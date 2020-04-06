import React from 'react';
import Card from '@material-ui/core/Card';
import ImageComponent from '../image/ImageComponent'

const ImageCardComponent = () => {
  return (
    <Card>
      <ImageComponent src="/logo192.png" />
    </Card>
  )
}

export default ImageCardComponent;
