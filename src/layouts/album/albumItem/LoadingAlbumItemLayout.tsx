import React from 'react';
import { Album } from '../../../graphql/types.d';
import LoadingImageCardComponent from '../../../components/imageCard/LoadingImageCardComponent';

const LoadingAlbumItemLayout = ({ width }:{ width:string|number, }) => {
  return (
    <LoadingImageCardComponent width={width} />
  )
}

export default LoadingAlbumItemLayout
