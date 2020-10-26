import React, { useContext, useEffect } from 'react';
import { AppleMusicTokenDocument } from '../../graphql/types.d';
import initMusicKit from '../../hooks/useMusicKit/initMusicKit';
import UserContext from '../../hooks/userContext';
import useMusicKitReady from '../../hooks/useMusicKit/useMusicKitReady';
import { useLazyQuery } from '@apollo/react-hooks';

// Apple Music API を初期化するだけの component
const InitAppleMusic = () => {
  const [getToken, { data }] = useLazyQuery(AppleMusicTokenDocument);
  const userContext = useContext(UserContext)
  const isReady = useMusicKitReady()

  useEffect(() => {
    if(!userContext.state.user) return
    // 実行権限
    if(!userContext.state.user.role.allowedActions.includes("appleMusicToken")) return
    // 設定済みのためスキップ
    if(isReady) return

    if(!data) {
      getToken()
      return
    }

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

    console.log("Init Apple Music!!")
    initMusicKit(config)
  }, [getToken, data, userContext.state.user, isReady])

  return <></>
}

export default InitAppleMusic
