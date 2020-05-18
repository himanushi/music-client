import React, { useContext } from 'react';
import { useScrollTrigger, AppBar, Toolbar, Typography, Slide, IconButton, Grid } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person'
import AlbumIcon from '@material-ui/icons/Album'
import { Link } from 'react-router-dom';
import UserContext, { InitializeStatus } from '../../hooks/userContext';

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

const Bar = () => {
  const { state } = useContext(UserContext)

  let meContent = <></>
  if(state.initializeStatus === InitializeStatus.Done){
    meContent =
      <Grid item>
        <IconButton component={Link} to={`/me`} size="small" color="inherit">
          <AlbumIcon />
        </IconButton>
      </Grid>
  }

   return <>
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
              <IconButton component={Link} to={`/artists`} size="small" color="inherit">
                <PersonIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton component={Link} to={`/albums`} size="small" color="inherit">
                <AlbumIcon />
              </IconButton>
            </Grid>
            {meContent}
          </Grid>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  </>
}

export default Bar
