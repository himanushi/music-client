import React, { useEffect } from 'react';
import { useAlbumQuery, Album } from '../../../graphql/types.d';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import ArtistsLayout from '../../artist/list/ArtistsLayout';
import PreviewPlayerComponent from '../../../components/player/PreviewPlayerComponent';
import ReactGA from 'react-ga';

// TODO: このファイル汚すぎるのでリファクタすること
const AlbumInfoLayout = () => {
  const { id } = useParams()
  const { loading, error, data } = useAlbumQuery({ variables: { id: id } })

  // SEO対策
  // 説明は PreviewPlayerComponent で追記している
  useEffect(() => {
    if (data && data.album) {
      const titles = document.title.split("-")
      document.title = `${data.album.name} - ${titles[titles.length - 1].trim()}`

      // トラッキング
      ReactGA.pageview(window.location.pathname + window.location.search);
      console.log(window.location.pathname + window.location.search)
    }

    return () => { document.title = "ゲーム音楽" }
  }, [data])

  if (error) return <div>{error.message}</div>

  let content = <></>

  if(!loading && data && data.album) {
    const album_content = <PreviewPlayerComponent album={data.album as Album} />

    content =
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
        >
          <Grid item>
            {album_content}
          </Grid>
          <Grid item>
            <ArtistsLayout />
          </Grid>
      </Grid>
  }

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        {content}
      </Grid>
    </Grid>
  )
}

export default AlbumInfoLayout
