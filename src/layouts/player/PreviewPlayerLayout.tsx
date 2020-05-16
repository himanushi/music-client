import React, { useContext } from 'react';
import { Grid, IconButton, makeStyles, Theme } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import PlayerContext, { PlaybackStatus, LoadingStatus } from '../../hooks/playerContext';

const useStyles = makeStyles((_theme: Theme) => ({
  '@keyframes loading-icon-spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  loadingIcon: {
    height: 35,
    width: 35,
    animationName: '$loading-icon-spin',
    animationDuration: '2000ms',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  }
}));

const PreviewPlayerLayout = () => {
  const { state, dispatch } = useContext(PlayerContext)
  const classes = useStyles()

  let playbackButton = <></>

  if(state.loadingStatus === LoadingStatus.Loading) {
    playbackButton =
      <IconButton aria-label="loading" disabled={true}>
        <AutorenewIcon className={classes.loadingIcon} />
      </IconButton>
  } else {
    switch(state.playbackStatus) {
      case PlaybackStatus.None:
        playbackButton =
          <IconButton color="inherit" disabled={true}>
            <PlayArrowIcon fontSize="large" />
          </IconButton>
        break;
      case PlaybackStatus.Play:
        playbackButton =
          <IconButton color="inherit" onClick={() => dispatch({ type: "PAUSE" })}>
            <PauseIcon fontSize="large" />
          </IconButton>
        break;
      case PlaybackStatus.Pause:
        playbackButton =
          <IconButton color="inherit" onClick={() => dispatch({ type: "PLAY" })}>
            <PlayArrowIcon fontSize="large" />
          </IconButton>
        break;
      case PlaybackStatus.Stop:
        playbackButton =
          <IconButton color="inherit" onClick={() => dispatch({ type: "PLAY", no: 0 })}>
            <PlayArrowIcon fontSize="large" />
          </IconButton>
        break;
    }
  }

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        {playbackButton}
      </Grid>
    </Grid>
  )
}

export default PreviewPlayerLayout
