import React, { useContext } from 'react';
import { TableRow, TableCell, IconButton, makeStyles, Theme, SvgIconProps } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AlbumIcon from '@material-ui/icons/Album'
import { Track } from '../../graphql/types.d'
import PlayerContext, { PlaybackStatus } from '../../hooks/playerContext';

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
  { track, index, playAction }:
  { track:Track, index:number, playAction:(no:number) => void }
) => {
  const classes = useStyles()
  const { state } = useContext(PlayerContext)

  const playable = track.previewUrl !== null
  if(!playable)debugger
  const playing = (state.playbackStatus === PlaybackStatus.Play)
  const currentTrack =
    (index === state.currentNo) &&
    (track.id === state.player.currentTrack()?.id)

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
                  <stop offset="10%" stopColor={"#4AC6D2"} />
                  <stop offset="90%" stopColor={"#F2D349"} />
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

  return (
    <TableRow>
      <TableCell align="center">
        {
          playable ? (
            currentTrack ?
              <IconButton component="span">
                {currentTrackIcon}
              </IconButton>
            :
              <IconButton onClick={() => playAction(index)} component="span">
                <PlayArrowIcon />
              </IconButton>
          )
          :
            <></>
        }
      </TableCell>
      <TableCell>{track.name}</TableCell>
    </TableRow>
  )
}

export default PreviewPlayerItemComponent
