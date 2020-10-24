import React, { useEffect } from 'react';
import RootStyleLayout from './RootStyle';
import { unregister } from './serviceWorker'
import ReactGA from 'react-ga';

const App = () => {
  // トラッキング
  useEffect(() => {
    if(process.env.REACT_APP_GA_ID) {
      ReactGA.initialize(process.env.REACT_APP_GA_ID)
      ReactGA.pageview(window.location.pathname + window.location.search)
      console.log(window.location.pathname + window.location.search)
    }
  }, [])

  return <RootStyleLayout />
}

export default App

unregister()
