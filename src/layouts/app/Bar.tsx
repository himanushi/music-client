import React from 'react';
import { useScrollTrigger, AppBar, Toolbar, Typography, Slide } from '@material-ui/core';

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
          <Typography variant="h6">ゲーム音楽</Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
    <Toolbar />
  </>

export default Bar
