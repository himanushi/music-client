import React, { useEffect } from 'react';
import { Card, CardContent } from '@material-ui/core';
import ReactGA from 'react-ga'
import ReactMarkdown from 'react-markdown'

const InformationLayout = (markdown:string) => {

  // トラッキング
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    console.log(window.location.pathname + window.location.search)
  }, [])

  return <Card>
    <CardContent>
      <ReactMarkdown
        source={markdown}
        escapeHtml={true}
      />
    </CardContent>
  </Card>
}

export default InformationLayout
