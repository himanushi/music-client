import React, { useState, useEffect } from 'react'
import { Grid, Typography, Slider } from '@material-ui/core'
import PreviewPlayer from './PreviewPlayer'

const PlayerSeekComponent = ({ player }:{ player?:PreviewPlayer|null }) => {
  const [currentDuration, setCurrentDuration] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if(player) setCurrentDuration(player.nowTrackDuration())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Grid container spacing={2}>
      <Typography align="center" color="textSecondary">
        {/* {playbackTimeStr} */}
      </Typography>
      <Grid item xs>
        <Slider
          step={0.1}
          min={0}
          max={30000 / 1000}
          value={currentDuration}
          color="secondary"
          // onChangeCommitted={changeSeek}
          aria-labelledby="continuous-slider"
        />
      </Grid>
      <Typography align="center" color="textSecondary">
        {/* -{playbackTimeRemainingStr} */}
      </Typography>
    </Grid>
  )
}

export default PlayerSeekComponent