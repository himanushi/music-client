import React from 'react';
import Typography from '@material-ui/core/Typography';

const TitleComponent = ({ title }:{ title:string }) => {
  return (
    <Typography
      align="left"
      variant="caption"
      color="textPrimary"
      component="h3"
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {title}
    </Typography>
  )
}

export default TitleComponent
