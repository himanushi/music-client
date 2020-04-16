import React from 'react';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import Root from './Root';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  },
  typography: {
    fontFamily: [
      '"Noto Sans JP"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})

const RootStyleLayout = () =>
  <ThemeProvider theme={theme}>
    {/* リセットCSS */}
    <CssBaseline />
    {/* フォント */}
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+JP" rel="stylesheet" />
    <Root />
  </ThemeProvider>

export default RootStyleLayout
