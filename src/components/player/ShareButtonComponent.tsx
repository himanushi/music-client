import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { Album } from '../../graphql/types.d'
import ShareIcon from '@material-ui/icons/Share';
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'

const ShareButtonComponent = ({ album }:{ album:Album }) => {
  // TODO: 他のSNSでも汎用的に使えるようにリファクタしろよな
  let twitterUrl = `https://twitter.com/intent/tweet`
  twitterUrl += `?text=${album.name} - ゲーム音楽`
  twitterUrl += `&url=https://video-game-music.net/albums/${album.id}?ai=${album.id}`
  twitterUrl += `&hashtags=ゲーム音楽,vgm`
  twitterUrl += `&via=vgm_net`

  return (
    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
      <Grid item>
        {/* サイズ統一するため無駄だけど無効ボタンにしておく */}
        <IconButton size="small" disabled>
          <ShareIcon/>
        </IconButton>
      </Grid>
      <Grid item>
        {/* ref: https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview */}
        <IconButton
          size="small"
          href={twitterUrl}
          target="_blank"
        >
          <TwitterIcon  />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default ShareButtonComponent
