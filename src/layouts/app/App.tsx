import React from 'react';
import RootStyleLayout from './RootStyle';
import { register, unregister } from './serviceWorker'

const App = () => <RootStyleLayout />

export default App

// SPA, PWA 対応
// ref: https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
const isMobile = () => {
  const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
  ]
  return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
  })
}

if (isMobile()) {
  register()
} else {
  unregister()
}
