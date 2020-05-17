import React, { useContext } from 'react';
import { Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import PlayerContext, { PlaybackStatus, LoadingStatus } from '../../hooks/playerContext';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ImageCardComponent from '../../components/imageCard/ImageCardComponent';

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
}))

const PreviewPlayerLayout = () => {
  const { state, dispatch } = useContext(PlayerContext)
  const classes = useStyles()

  let playbackButton = <></>
  let skipButton =
    <IconButton color="inherit" onClick={() => dispatch({ type: "NEXT_PLAY" })}>
      <SkipNextIcon fontSize="large" />
    </IconButton>

  if(state.loadingStatus === LoadingStatus.Loading) {
    // TODO: 今の所ローディング表示はしていないのでいらないかも、要確認
    playbackButton =
      <IconButton aria-label="loading" disabled={true}>
        <AutorenewIcon className={classes.loadingIcon} />
      </IconButton>
    skipButton = playbackButton
  } else {
    switch(state.playbackStatus) {
      case PlaybackStatus.None:
        playbackButton =
          <IconButton color="inherit" disabled={true}>
            <PlayArrowIcon fontSize="large" />
          </IconButton>
        skipButton =
          <IconButton color="inherit" disabled={true}>
            <SkipNextIcon fontSize="large" />
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

  let artwork_content = <></>
  let title_content = <></>
  if(state.player.tracks[state.currentNo]){
    const track = state.player.tracks[state.currentNo]
    if(track.artworkM?.url) {
      artwork_content =
        <ImageCardComponent linkUrl={`${state.player.linkUrl}#${track.id}`} title={""} src={track.artworkM.url} width={"40px"} />
    }
    title_content =
      <Typography style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }} variant="caption" component="p">{track.name}</Typography>
  }

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
    >
      <Grid item xs={5}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            {artwork_content}
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={7}>
            {title_content}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid item>
            {playbackButton}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid item>
            {skipButton}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={1}>{/* ダミー */}</Grid>
    </Grid>
  )
}

export default PreviewPlayerLayout
