/// <reference path="MusicKitV1.d.ts" />

import { useState, useEffect } from "react"

// MusicKit をインスタンス化可能な場合は true を返す
const useMusicKitReady = () => {
  const [isReady, setIsReady] = useState(() => {
    let initialReady

    if("undefined" !== typeof MusicKit) {
      try {
        MusicKit.getInstance()
        initialReady = true
      } catch (e) {
        initialReady = false
      }
    } else {
      initialReady = false
    }

    return initialReady
  })

  useEffect(() => {
    if (isReady) return

    const eventContent = () => {
      // 一度存在確認が出来たらリスナーは無駄なので削除する
      document.removeEventListener("musickitconfigured", eventContent)
      setIsReady(true)
    }

    document.addEventListener("musickitconfigured", eventContent)

    return () => document.removeEventListener("musickitconfigured", eventContent)
  }, [isReady])

  return isReady
}

export default useMusicKitReady
