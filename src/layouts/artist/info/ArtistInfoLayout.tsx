import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Artist, ArtistDocument } from '../../../graphql/types.d';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import AlbumsLayout from '../../album/list/AlbumsLayout';
import ImageCardComponent from '../../../components/imageCard/ImageCardComponent';
import ReactGA from 'react-ga';
import FavoriteComponent from '../../../components/favorite/FavoriteComponent';

const ArtistInfoLayout = () => {
  const { id } = useParams<{ id:string }>()
  const { error, data } =
    useQuery<{ artist: Artist | null }>(ArtistDocument,{ variables: { id: id } })

  // SEO対策
  useEffect(() => {
    if (data && data.artist) {
      const titles = document.title.split("-")
      document.title = `${data.artist.name} - ${titles[titles.length - 1].trim()}`
      const description = `${data.artist.name}さんのゲーム音楽アルバム一覧です。`
      document.querySelector('meta[name="description"]')?.setAttribute("content", description)

      // トラッキング
      ReactGA.pageview(window.location.pathname + window.location.search)
      console.log(window.location.pathname + window.location.search)
    }

    return () => {
      document.title = "ゲーム音楽"
      document.querySelector('meta[name="description"]')?.setAttribute("content", "音楽サブスクリプション配信中のゲーム音楽のポータルサイト")
    }
  }, [data])

  if (error) return <div>{error.message}</div>

  let content = <></>

  if (data && data.artist) {
    content =
      <ImageCardComponent
        title={data.artist.name}
        src={data.artist.artworkL.url}
        width={270}
        topComponent={<FavoriteComponent favorable_type="artist" favorable_id={data.artist.id} contentWidth={270} />}
      />
  }

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justify="center"
      alignItems="center"
    >
      {content}
      <Grid item>
        <AlbumsLayout />
      </Grid>
    </Grid>
  )
}

export default ArtistInfoLayout
