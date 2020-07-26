import React from 'react';
import { useScrollTrigger, AppBar, Toolbar, Typography, Slide, IconButton, Grid, Menu, MenuItem } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person'
import AlbumIcon from '@material-ui/icons/Album'
import InfoIcon from '@material-ui/icons/Info';
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
    document.querySelector('meta[name="description"]')?.setAttribute("content", "音楽サブスクリプション配信中のゲーム音楽のポータルサイト")
  }

  const [anchorEl, setAnchorEl] = React.useState<Element|null>(null)

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
              <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} edge="start" size="small" color="inherit" aria-label="menu">
                <InfoIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem component={Link} onClick={()=>{resetTitle("このサイトについて");setAnchorEl(null)}} to={`/about`}>このサイトについて</MenuItem>
                {/* <MenuItem onClick={() => setAnchorEl(null)}>利用規約</MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>プライバシーポリシー</MenuItem> */}
              </Menu>
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
