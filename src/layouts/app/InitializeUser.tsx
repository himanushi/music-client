import React, { useContext, useEffect } from 'react';
import { useMeQuery, CurrentUser } from '../../graphql/types.d';
import UserContext from '../../hooks/userContext';

// ユーザーを初期化するだけの component
const InitializeUser = () => {
  const { data } = useMeQuery()
  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    if(state.user === null && data && data.me) {
      dispatch({ type: "SET_USER", user: data.me as CurrentUser })
    }
  }, [data, state.user, dispatch])

  return <></>
}

export default InitializeUser
