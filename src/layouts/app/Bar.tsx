import React from 'react';
import { useScrollTrigger, AppBar, Toolbar, Typography, Slide, IconButton, Grid, Menu, MenuItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
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

const Bar = () => {
  // SEO対策
  const resetTitle = (title:string) => () => {
    document.title = `${title} - ゲーム音楽`
    document.querySelector('meta[name="description"]')?.setAttribute("content", "音楽サブスクリプション配信中のゲーム音楽のポータルサイト")
  }

  const [searchEl, setSearchEl] = React.useState<Element|null>(null)
  const [infoEl,   setInfoEl]   = React.useState<Element|null>(null)

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
              <IconButton onClick={(event) => setSearchEl(event.currentTarget)} edge="start" size="small" color="inherit" aria-label="menu">
                <SearchIcon />
              </IconButton>
              <Menu
                anchorEl={searchEl}
                keepMounted
                open={Boolean(searchEl)}
                onClose={() => setSearchEl(null)}
              >
                <MenuItem component={Link} onClick={()=>{resetTitle("アーティスト一覧");setSearchEl(null)}} to={`/artists`}>アーティスト一覧</MenuItem>
                <MenuItem component={Link} onClick={()=>{resetTitle("アルバム一覧");setSearchEl(null)}} to={`/albums`}>アルバム一覧</MenuItem>
              </Menu>
            </Grid>
            <Grid item>
              <IconButton onClick={(event) => setInfoEl(event.currentTarget)} edge="start" size="small" color="inherit" aria-label="menu">
                <InfoIcon />
              </IconButton>
              <Menu
                anchorEl={infoEl}
                keepMounted
                open={Boolean(infoEl)}
                onClose={() => setInfoEl(null)}
              >
                <MenuItem component={Link} onClick={()=>{resetTitle("このサイトについて");setInfoEl(null)}} to={`/about`}>このサイトについて</MenuItem>
                <MenuItem component={Link} onClick={()=>{resetTitle("利用規約");setInfoEl(null)}} to={`/terms`}>利用規約</MenuItem>
                <MenuItem component={Link} onClick={()=>{resetTitle("プライバシーポリシー");setInfoEl(null)}} to={`/privacy`}>プライバシーポリシー</MenuItem>
                <MenuItem component={Link} onClick={()=>{resetTitle("クッキーポリシー");setInfoEl(null)}} to={`/cookie_policy`}>クッキーポリシー</MenuItem>
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
