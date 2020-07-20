import React, { useEffect } from 'react';
import { Card, Typography, CardContent, IconButton } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter'
import GitHubIcon from '@material-ui/icons/GitHub'
import ReactGA from 'react-ga'

const AboutLayout = () => {

  // トラッキング
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    console.log(window.location.pathname + window.location.search)
  }, [])

  return <Card>
    <CardContent>
      <Typography variant="h5" component="h1">
        このサイトについて
      </Typography>
      <Typography variant="h6" component="h2">
        概要
      </Typography>
      <Typography color="textSecondary">
        音楽サブスクリプション配信中のゲーム音楽を検索できるサイトです。
        今のところ検索機能しかありません。今後お気に入り機能、プレイリスト作成公開機能などを追加する予定です。
        非商用で公開しています。
      </Typography>
      <Typography variant="h6" component="h2">
        目的
      </Typography>
      <Typography color="textSecondary">
        私が新しいゲーム音楽に出会うために公開しています。
        今後、お気に入り機能やプレイリスト機能などの実装により、ユーザー同士でゲーム音楽を共有できるといいですね。
      </Typography>
      <Typography variant="h6" component="h2">
        SNSと開発プロジェクト
      </Typography>
      <IconButton onClick={() => window.open('https://twitter.com/vgm_net')} edge="start" size="small" color="inherit" aria-label="menu">
        <TwitterIcon />
      </IconButton>
      <IconButton onClick={() => window.open('https://github.com/users/himanushi/projects/2')} edge="start" size="small" color="inherit" aria-label="menu">
        <GitHubIcon />
      </IconButton>
    </CardContent>
  </Card>
}

export default AboutLayout
