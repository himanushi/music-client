import React, { useContext, useEffect } from 'react';
import InformationContext from '../../hooks/informationContext';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'

// クッキーポリシーの同意をするだけの component
const CookieInformation = () => {
  const { dispatch } = useContext(InformationContext)

  useEffect(() => {
    const cookieNotice = Cookies.get("cookieNotice")

    if(cookieNotice !== "true") {
      const text = <>クッキーポリシー<br/>当サービスを利用することにより、当サービスの<Link to="/cookie_policy" target="_blank">クッキーポリシー</Link>に記載されたクッキーの使用に同意することとみなされます。</>
      const closeHandler = () => {
        Cookies.set("cookieNotice", "true", { expires: 31536000, path: "/" })
        dispatch({ type: "CLOSE_ALERT" })
      }
      dispatch({ type: "ADD_ALERT", severity: "info", duration: 31536000, text, buttonText: "OK", closeHandler })
    }

  }, [dispatch])

  return <></>
}

export default CookieInformation
