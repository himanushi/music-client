import React from 'react';
import { AppBar } from '@material-ui/core';
import PreviewPlayerLayout from '../player/PreviewPlayerLayout';

// ref: https://material-ui.com/components/app-bar/#elevate-app-bar
const PlayerBar = () =>
  <AppBar position="fixed" color="primary" style={{ top: 'auto', bottom: 0 }}>
    <PreviewPlayerLayout />
  </AppBar>

export default PlayerBar
