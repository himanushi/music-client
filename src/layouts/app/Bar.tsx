import React from 'react';
import { useScrollTrigger, AppBar, Toolbar, Typography, Slide, IconButton, Grid } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person'
import AlbumIcon from '@material-ui/icons/Album'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import { Link } from 'react-router-dom';

// ref: https://material-ui.com/components/app-bar/#hide-app-bar
interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

const HideOnScroll = (props: Props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Bar = () =>
  <>
    <HideOnScroll>
      <AppBar>
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <Typography variant="h6">ゲーム音楽</Typography>
            </Grid>
            <Grid item>
              <IconButton component={Link} to={`/artists`} edge="start" size="small" color="inherit" aria-label="menu">
                <PersonIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton component={Link} to={`/albums`} edge="start" size="small" color="inherit" aria-label="menu">
                <AlbumIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton component={Link} to={`/tracks`} edge="start" size="small" color="inherit" aria-label="menu">
                <LibraryMusicIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  </>

export default Bar
