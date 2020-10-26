import { useState, useEffect, useContext } from "react"
import SpotifyWebApi from 'spotify-web-api-node'
import { useLocation, useHistory } from "react-router-dom"
import { v4 as uuid } from 'uuid'
import { useLazyQuery } from "@apollo/react-hooks"
import { SpotifyTokenDocument, SpotifyTokenQuery, SpotifyTokenQueryVariables } from "../../graphql/types.d"
import InformationContext from "../informationContext"
import SecureCookies from "../../lib/SecureCookies"

const spotifyAccessToken = "spotifyAccessToken"
const spotifyRefreshToken = "spotifyRefreshToken"
const spotifyDeviceId = "spotifyDeviceId"

const useSpotifyAuthentication = () => {
  const cookie = new SecureCookies()
  const [isAuthorized, setIsAuthorized] = useState<boolean>(() =>
    !!cookie.get(spotifyAccessToken) || !!cookie.get(spotifyRefreshToken)
  )
  const location = useLocation()
  const history = useHistory()
  const [getToken, { data, error }] = useLazyQuery<SpotifyTokenQuery, SpotifyTokenQueryVariables>(SpotifyTokenDocument);
  const infoContext = useContext(InformationContext)
  const scopes = ["streaming", "user-read-email", "user-read-private"]

  const authentication = {
    login: async () => {
      const _uuid = uuid()
      cookie.set("spotifyState", _uuid, { expires: 300 })
      const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID || ""
      const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI || ""
      const spotifyApi = new SpotifyWebApi({ clientId, redirectUri })
      const url = spotifyApi.createAuthorizeURL(scopes, _uuid)
      window.open(url, "_self")
    },
    logout: async () => {
      cookie.remove(spotifyAccessToken)
      cookie.remove(spotifyRefreshToken)
      cookie.remove(spotifyDeviceId)
      setIsAuthorized(false)
    },
  }

  // 1. ログイン後のリダイレクトでサーバーに問い合わせ
  useEffect(() => {
    if(isAuthorized) return

    const params = new URLSearchParams(location.search)
    const code = params.get("code")

    if(!!code && params.get("state") === cookie.get("spotifyState")) {
      cookie.remove("spotifyState", { expires: 300 })
      history.push(history.location.pathname)
      console.log("Get spotify token.")
      getToken({ variables: { code } })
    }
  }, [isAuthorized, setIsAuthorized, cookie, getToken, history, location.search])

  // 2. サーバーにトークン問い合わせ後
  useEffect(() => {
    if(isAuthorized) return

    if(data) {

      // 会員プランチェック
      (async () => {
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID || ""
        const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI || ""
        const spotifyApi = new SpotifyWebApi({ clientId, redirectUri })

        spotifyApi.setAccessToken(data.spotifyToken.accessToken)
        const me = await spotifyApi.getMe()
        if(me.body.product !== "premium") {
          infoContext.dispatch({ type: "ADD_ALERT", severity: "info", duration: 20000, text: "現在のプランではフル再生ができません。 Spotify Premium プランでのみフル再生ができます。", buttonText: "OK" })
        }
      })()

      console.log("Set spotify token.")
      cookie.set(spotifyAccessToken, data.spotifyToken.accessToken, { expires: 1/24 })

      // リフレッシュトークンは1週間にしておく
      if(data.spotifyToken.refreshToken) {
        cookie.set(spotifyRefreshToken, data.spotifyToken.refreshToken, { expires: 7 })
      }
      setIsAuthorized(true)
      window.location.reload()
    } else if(error) {
      infoContext.dispatch({ type: "ADD_ALERT", severity: "error", duration: 5000, text: "Spotify : " + error.graphQLErrors[0]["message"], buttonText: "OK" })
    }
  }, [data, error, isAuthorized, setIsAuthorized, cookie, infoContext])

  // 3. トークンリフレッシュ
  useEffect(() => {

    // リフレッシュトークンのみある状態は更新する
    const isRefresh = isAuthorized && !cookie.get(spotifyAccessToken) && cookie.get(spotifyRefreshToken)
    if(!data && isRefresh) {

      // サーバー問い合わせ前
      const refreshToken = cookie.get(spotifyRefreshToken)
      console.log("Refresh spotify token.")
      getToken({ variables: { refreshToken } })
    } else if(data && isRefresh) {

      // サーバー問い合わせ後
      cookie.set(spotifyAccessToken, data.spotifyToken.accessToken, { expires: 1/24 })
    }
  }, [data, error, isAuthorized, cookie, getToken])

  return { authentication, isAuthorized }
}

export default useSpotifyAuthentication
