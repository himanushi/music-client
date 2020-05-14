import React, { useContext } from 'react';
import { Grid, Toolbar, IconButton, Fab } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import StopIcon from '@material-ui/icons/Stop';
import PlayerContext, { PlaybackStatus } from '../../hooks/playerContext';
import ImageCardComponent from '../../components/imageCard/ImageCardComponent';
import ImageComponent from '../../components/image/ImageComponent';

const PreviewPlayerLayout = () => {
  const { state, dispatch } = useContext(PlayerContext)

  let playbackButton = <></>

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

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        {playbackButton}
      </Grid>
    </Grid>
  )
}

export default PreviewPlayerLayout
