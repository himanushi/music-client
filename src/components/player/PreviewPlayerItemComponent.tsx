import React, { useContext } from 'react';
import { TableRow, TableCell, IconButton, makeStyles, Theme, SvgIconProps, Grid } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StarRateIcon from '@material-ui/icons/StarRate'
import AlbumIcon from '@material-ui/icons/Album'
import { Track } from '../../graphql/types.d'
import PlayerContext, { PlaybackStatus } from '../../hooks/playerContext';
import FavoriteComponent from '../favorite/FavoriteComponent';
import UserContext from '../../hooks/userContext';

const useStyles = makeStyles((theme: Theme) => ({
  '@keyframes playing-icon-spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  playingIcon: {
    height: 24,
    width: 24,
    animationName: '$playing-icon-spin',
    animationDuration: '2000ms',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
}));

const PreviewPlayerItemComponent = (
  { track, index, playAction, averagePopularity }:
  { track:Track, index:number, playAction:(no:number) => void, averagePopularity:number }
) => {
  const classes = useStyles()
  const userContext = useContext(UserContext)
  const playerContext = useContext(PlayerContext)

  const playable = track.previewUrl !== null
  const playing = (playerContext.state.playbackStatus === PlaybackStatus.Play)
  const currentTrack =
    (index === playerContext.state.currentNo) &&
    (track.id === playerContext.state.player.currentTrack()?.id)

  let currentTrackIcon = <AlbumIcon
    color="primary"
    className={classes.playingIcon}
    component={(svgProps: SvgIconProps) => {
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="gradient1">
              {
                playing ?
                <>
                  <stop offset="20%" stopColor={"#4AC6D2"} />
                  <stop offset="80%" stopColor={"#F2D349"} />
                </>
                :
                <stop offset="100%" stopColor={"#4AC6D2"} />
              }
            </linearGradient>
          </defs>
          {React.cloneElement(
            (svgProps.children as React.ReactNodeArray)[0] as React.ReactElement,
            {
              fill: 'url(#gradient1)',
            },
          )}
        </svg>
      );
    }}
  />

  // 人気度が平均以上のものは星にする
  let starable = false
  if(averagePopularity < track.popularity) starable = true

  // 曲お気に入り行追加
  let canChangeFavorite = false
  if(userContext.state.user && userContext.state.user.role.allowedActions.includes("changeFavorites")) {
    canChangeFavorite = true
  }

  return (
    <TableRow>
      {
        canChangeFavorite ?
        <TableCell align="center">
          <Grid style={{ position: "relative" }}>
            <FavoriteComponent favorable_type="track" favorable_id={track.id} contentWidth={35} contentTop={-15} />
          </Grid>
        </TableCell>
        :
        <></>
      }
      <TableCell align="center">
        {
          currentTrack ?
            <IconButton component="span">
              {currentTrackIcon}
            </IconButton>
          :
            <IconButton onClick={() => playAction(index)} disabled={!playable} component="span">
              {starable ? <StarRateIcon /> : <PlayArrowIcon />}
            </IconButton>
        }
      </TableCell>
      <TableCell>{track.name}</TableCell>
    </TableRow>
  )
}

export default PreviewPlayerItemComponent
