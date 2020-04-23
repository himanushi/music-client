import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Artist, ArtistsDocument } from '../../../graphql/types.d';
import { Grid } from '@material-ui/core';
import PaginationComponent from '../../../components/pagination/paginationComponent';
import ArtistItemLayout from '../item/ArtistItemLayout';

const ArtistsLayout = () => {
  const limit = 30
  const { error, data, fetchMore } = useQuery<{ items: Artist[] }>(
    ArtistsDocument,
    {
      variables: {
        offset: 0,
        limit: limit,
        order: "POPULARITY",
        asc: false
      },
      // 戻るボタンで戻っても最初から読み込みが発生しない
      fetchPolicy: "cache-first"
    }
  )

  if (error) return <div>{error.message}</div>

  let content:JSX.Element[] = []

  if (data) {
    content =
      data.items.map(
        (item, i) =>
          <PaginationComponent
            key={i}
            component={<ArtistItemLayout artist={item} width="150px" key={i} />}
            no={i}
            offset={data.items.length}
            limit={limit}
            fetchMore={fetchMore}
          />
      )
  }

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justify="center"
      alignItems="center"
    >
      {content}
    </Grid>
  )
}

export default ArtistsLayout
