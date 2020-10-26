import React, { useContext, useEffect } from 'react';
import SecureCookies from '../../lib/SecureCookies';
import PlayerContext from '../../hooks/playerContext';

// Spotify API を初期化するだけの component
const InitSpotify = () => {
  const { dispatch } = useContext(PlayerContext)

  useEffect(() => {
    if(!dispatch) return

    if(!window.onSpotifyWebPlaybackSDKReady) {
      const cookie = new SecureCookies();

      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = cookie.get("spotifyAccessToken")
        if(!token) return console.log("Not found spotify token!!")

        const player = new Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: cb => { cb(token); }
        })

        player.addListener('player_state_changed', state => {
          // 自動停止時
          if(state.paused && state.position === 0 && state.track_window.previous_tracks.length === 0) {
            dispatch({ type: "NEXT_PLAY" })
          }
        })

        player.addListener('ready', ({ device_id }) => {
          cookie.set("spotifyDeviceId", device_id, { expires: 7 })
        })

        console.log("Init Spotify!!")
        player.connect()
      }
    }
  }, [dispatch])

  return <></>
}

export default InitSpotify
