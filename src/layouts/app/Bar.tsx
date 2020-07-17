import React from 'react';
import { useScrollTrigger, AppBar, Toolbar, Typography, Slide, IconButton, Grid } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person'
import AlbumIcon from '@material-ui/icons/Album'
import { Link } from 'react-router-dom';
import TwitterIcon from '@material-ui/icons/Twitter';

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
  // SEO対策
  const resetTitle = (title:string) => () => {
    document.title = `${title} - ゲーム音楽`
    document.querySelector('meta[name="description"]')?.setAttribute("content", "ゲーム音楽のポータルサイト")
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
              <IconButton component={Link} onClick={resetTitle("アーティスト一覧")} to={`/artists`} edge="start" size="small" color="inherit" aria-label="menu">
                <PersonIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton component={Link} onClick={resetTitle("アルバム一覧")} to={`/albums`} edge="start" size="small" color="inherit" aria-label="menu">
                <AlbumIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => window.open('https://twitter.com/vgm_net/status/1283761061569507328?s=20')} edge="start" size="small" color="inherit" aria-label="menu">
                <TwitterIcon />
              </IconButton>
            </Grid>
            {/* <Grid item>
              <IconButton component={Link} to={`/tracks`} edge="start" size="small" color="inherit" aria-label="menu">
                <LibraryMusicIcon />
              </IconButton>
            </Grid> */}
          </Grid>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  </>
}

export default Bar
