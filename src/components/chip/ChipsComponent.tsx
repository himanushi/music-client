import React from 'react';
import { Chip, MuiThemeProvider, createMuiTheme } from '@material-ui/core';

const ChipsComponent = ({
  color, labels, onDelete
}:{
  color: "blue" | "yellow", labels:string[], onDelete:((label: string) => void)
}) => {
  let colorCode = ""
  switch(color) {
    case "blue":
      colorCode = "#4AC6D2"
      break
    case "yellow":
      colorCode = "#F2D349"
      break
  }

  return (
    <MuiThemeProvider theme={createMuiTheme({ palette: { primary: { main: colorCode } } })}>
      { labels.map((label, index) =><Chip color="primary" key={index} label={label} onDelete={() => onDelete(label)} />) }
    </MuiThemeProvider>
  )
}

export default ChipsComponent
