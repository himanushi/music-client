import React, { useContext, useState } from 'react';
import { TableRow, TableCell, IconButton, makeStyles, Theme, SvgIconProps, Grid, Collapse, Box, Table, TableBody } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StarRateIcon from '@material-ui/icons/StarRate'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import LinkIcon from '@material-ui/icons/Link';
import AlbumIcon from '@material-ui/icons/Album'
import { Track } from '../../graphql/types.d'
import PlayerContext, { PlaybackStatus } from '../../hooks/playerContext';
import FavoriteComponent from '../favorite/FavoriteComponent';
import UserContext from '../../hooks/userContext';
import { Link } from 'react-router-dom';

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
  const [open, setOpen] = useState(false)

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

  // SEO対策
  const resetTitle = (title:string) => () => {
    document.title = `${title} - ゲーム音楽`
    document.querySelector('meta[name="description"]')?.setAttribute("content", "音楽サブスクリプション配信中のゲーム音楽のポータルサイト")
  }

  return (
    <>
      <TableRow>
        <TableCell style={{ border: 'none' }} align="center">
          {
            currentTrack ?
              <IconButton component="span">
                {currentTrackIcon}
              </IconButton>
            :
              <IconButton  onClick={() => playAction(index)} disabled={!playable} component="span">
                {starable ? <StarRateIcon /> : <PlayArrowIcon />}
              </IconButton>
          }
        </TableCell>
        <TableCell style={{ border: 'none' }}>{track.name}</TableCell>
        <TableCell style={{ border: 'none' }}>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table aria-label="purchases">
                <TableBody>
                  {
                    canChangeFavorite ?
                    <TableRow>
                      <TableCell style={{ width: "10%", border: 'none' }} component="th" scope="row">
                        <Grid style={{ position: "relative" }}>
                          <FavoriteComponent favorable_type="track" favorable_id={track.id} contentWidth={35} contentTop={-15} />
                        </Grid>
                      </TableCell>
                      <TableCell style={{ width: "90%", border: 'none' }}>お気に入り</TableCell>
                    </TableRow>
                    :
                    <></>
                  }
                  <TableRow>
                    <TableCell style={{ width: "10%", border: 'none' }} component="th" scope="row">
                      <IconButton component={Link} onClick={()=>{resetTitle("アーティスト一覧")}} to={`/artists?ai=${track.id}`} size="small">
                        <LinkIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell style={{ width: "90%", border: 'none' }}>関連アーティスト</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: "10%", border: 'none' }} component="th" scope="row">
                      <IconButton component={Link} onClick={()=>{resetTitle("アルバム一覧")}} to={`/albums?bi=${track.id}`} size="small">
                        <LinkIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell style={{ width: "90%", border: 'none' }}>関連アルバム</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default PreviewPlayerItemComponent
