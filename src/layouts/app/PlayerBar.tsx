import React from 'react';
import { useScrollTrigger, AppBar, Toolbar, Typography, IconButton, Grid } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person'
import AlbumIcon from '@material-ui/icons/Album'
import { Link } from 'react-router-dom';
import PreviewPlayerLayout from '../player/PreviewPlayerLayout';

// ref: https://material-ui.com/components/app-bar/#elevate-app-bar
const PlayerBar = () =>
  <AppBar position="fixed" color="primary" style={{ top: 'auto', bottom: 0 }}>
    <PreviewPlayerLayout />
  </AppBar>

export default PlayerBar
