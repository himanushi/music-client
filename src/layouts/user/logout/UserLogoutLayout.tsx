import React, { useEffect, useContext } from 'react';
import { useLogoutMutation, LogoutPayload, CurrentUser } from '../../../graphql/types.d';
import UserContext from '../../../hooks/userContext';
import InformationContext from '../../../hooks/informationContext';
import { useHistory } from 'react-router-dom';

const UserLogoutLayout = () => {
  const userContext = useContext(UserContext)
  const infoContext = useContext(InformationContext)

  let history = useHistory()

  interface LogoutResponse {
    data: { logout: LogoutPayload }
  }
  const [logout] = useLogoutMutation({
    update: (_, response:LogoutResponse) => {
      if (response.data.logout.error) {
        infoContext.dispatch({ type: "ADD_ALERT", severity: "error", duration: 5000, text: response.data.logout.error, buttonText: "OK" })
      } else {
        history.push("/")
        userContext.dispatch({ type: "SET_USER", user: response.data.logout.currentUser as CurrentUser })
        infoContext.dispatch({ type: "ADD_ALERT", severity: "success", duration: 5000, text: "ログアウトしました", buttonText: "OK" })
      }
    },
    variables: { input: {} },
  })

  useEffect(() => {
    logout()
    try { MusicKit.getInstance().unauthorize() } catch {}
  }, [logout])

  return <></>
}

export default UserLogoutLayout
