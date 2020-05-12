import React from 'react'
import { IconButton } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PreviewPlayer from './PreviewPlayer'
import PlayerSeekComponent from './PlayerSeekComponent'

const PreviewPlayerControllerComponent = ({ player }:{ player?:PreviewPlayer|null }) => {
  if(!player) return <></>

  return (
    <>
      <IconButton onClick={() => player.play()} component="span">
        <PlayArrowIcon />
        <PlayerSeekComponent player={player} />
      </IconButton>
    </>
  )
}

export default PreviewPlayerControllerComponent
