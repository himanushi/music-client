import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { AlbumsDocument, Album, AlbumsConditions } from '../../../graphql/types.d';
import AlbumItemLayout from '../item/AlbumItemLayout';
import { Grid } from '@material-ui/core';
import PaginationComponent from '../../../components/pagination/paginationComponent';
import useConditions from '../../../hooks/useConditions';

const AlbumsLayout = () => {
  const conditions = useConditions<AlbumsConditions>()
  const limit = 50
  const { error, data, fetchMore } = useQuery<{ items: Album[] }>(
    AlbumsDocument,
    {
      variables: {
        offset: 0,
        limit: limit,
        order: "RELEASE",
        asc: true,
        ...{ conditions }
      },
      // 戻るボタンで戻っても最初から読み込みが発生しない
      fetchPolicy: "cache-first"
    }
  )

  if (error) return <div>{error.message}</div>

  let albums_content:JSX.Element[] = []

  if (data) {
    albums_content =
      data.items.map(
        (item, i) =>
          <PaginationComponent
            key={i}
            component={<AlbumItemLayout album={item} width="150px" key={i} />}
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
      {albums_content}
    </Grid>
  )
}

export default AlbumsLayout;
