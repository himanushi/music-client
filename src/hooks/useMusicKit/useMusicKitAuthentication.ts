/// <reference path="MusicKitV1.d.ts" />

import { useState, useEffect } from "react"
import useMusicKitReady from "./useMusicKitReady"

const useMusicKitAuthentication = () => {
  const isReady = useMusicKitReady()

  const [isAuthorized, setIsAuthorized] = useState(() => {
    return isReady ? MusicKit.getInstance().isAuthorized : false
  })

  const authentication = {
    login:  async () => await MusicKit.getInstance().authorize(),
    logout: async () => await MusicKit.getInstance().unauthorize(),
  }

  useEffect(() => {
    if (!isReady) return

    const callback = (result: { authorizationStatus: number }) => {
      // 0 がログアウト状態
      setIsAuthorized(0 !== result.authorizationStatus)
    }

    MusicKit.getInstance().addEventListener(MusicKit.Events.authorizationStatusDidChange, callback)
    setIsAuthorized(MusicKit.getInstance().isAuthorized)

    return () => MusicKit.getInstance().removeEventListener(MusicKit.Events.authorizationStatusDidChange, callback)
  }, [isReady])

  return { authentication, isAuthorized }
}

export default useMusicKitAuthentication
