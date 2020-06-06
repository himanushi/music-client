import React from 'react';
import { Grid, Button } from '@material-ui/core';
import initMusicKit from '../../../hooks/useMusicKit/initMusicKit';
import { useAppleMusicTokenQuery } from '../../../graphql/types.d';

const AppleMusicLayout = () => {
  // debugger
  const { data } = useAppleMusicTokenQuery()

  if(data) {
    console.log("initMusicKit")
    initMusicKit({
      initConfig: {
        developerToken: data.appleMusicToken,
        app: {
          name: "Video Game Music Catalog",
          build: "0.0.1"
        }
      },
      countryCode: "jp"
    })
  }

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid>
        <Button>
          ログイン
        </Button>
      </Grid>
    </Grid>
  )
}

export default AppleMusicLayout
