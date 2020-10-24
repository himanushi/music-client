import React, { useContext, useEffect } from 'react';
import { useMeQuery, CurrentUser } from '../../graphql/types.d';
import UserContext from '../../hooks/userContext';
import Cookies from 'js-cookie'

const version = "jsFileVersion"

// ユーザーを初期化するだけの component
const InitializeUser = () => {
  const { data } = useMeQuery()
  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    if(state.user === null && data && data.me) {

      // バージョン違いの場合は強制スーパーリロード
      if(window.navigator.cookieEnabled) {
        const v = Cookies.get(version)

        if(!v) {
          // 初回表示
          Cookies.set(version, data.me.version)
        } else if(data.me.version !== v) {
          // 二回以降
          Cookies.set(version, data.me.version)
          window.location.reload(true)
        }
      } else {
        console.log("cookie が有効ではありません")
      }

      dispatch({ type: "SET_USER", user: data.me as CurrentUser })
    }
  }, [data, state.user, dispatch])

  return <></>
}

export default InitializeUser
