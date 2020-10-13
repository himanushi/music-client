import React, { useContext, useEffect } from 'react';
import { useAppleMusicTokenQuery } from '../../graphql/types.d';
import initMusicKit from '../../hooks/useMusicKit/initMusicKit';

// Apple Music API を初期化するだけの component
const InitAppleMusic = () => {
  const { data } = useAppleMusicTokenQuery()

  useEffect(() => {
    if(!data) return

    const config = {
      initConfig : {
        developerToken : data.appleMusicToken,
        app: {
          name: "video-game-music",
          build: "0.0.1"
        }
      },
      countryCode: "jp",
    }

    initMusicKit(config)
  }, [data])

  return <></>
}

export default InitAppleMusic
