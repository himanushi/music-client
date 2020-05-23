import React, { useState } from 'react';
import { useAlbumsQuery, Album, AlbumsQueryVariables } from '../../../graphql/types.d';
import AlbumItemLayout from '../item/AlbumItemLayout';
import { Grid } from '@material-ui/core';
import PaginationComponent from '../../../components/pagination/paginationComponent';
import useParameters, { ParameterKeys, ParameterPrefixKeys } from '../../../hooks/useParameters';
import { useHistory } from 'react-router-dom';
import OrderComponent from '../../../components/search/OrderComponent';
import SearchKeywordComponent from '../../../components/search/SearchKeywordComponent';

const AlbumsLayout = () => {
  const [order, setOrder] = useState<string>("RELEASE.DESC")
  const parameters = useParameters<AlbumsQueryVariables>("album")
  let history = useHistory()
  const limit = 50
  const { error, data, fetchMore } = useAlbumsQuery(
    {
      variables: {
        cursor: {
          offset: 0,
          limit: limit,
        },
        sort: parameters.sort,
        conditions: parameters.conditions,
      },
      // 戻るボタンで戻っても最初から読み込みが発生しない
      fetchPolicy: "cache-first"
    }
  )

  // 並び順初期化
  const _order = parameters?.sort ? `${parameters?.sort?.order}.${parameters?.sort?.type}` : null
  if(_order && order !== _order){
    setOrder(_order)
  }

  if (error) return <div>{error.message}</div>

  let content:JSX.Element[] = []

  if (data) {
    content =
      data.items.map(
        (item, i) =>
          <Grid item key={i}>
            <PaginationComponent
              component={<AlbumItemLayout album={item as Album} width="150px" />}
              no={i}
              offset={data.items.length}
              limit={limit}
              fetchMore={fetchMore}
            />
          </Grid>
      )
  }

  const handleChange = (event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
  }>, _child: React.ReactNode) => {
    const sort = event.target.value as string
    const [order, sortType] = sort.split(".")
    setOrder(sort)
    const params = new URLSearchParams(history.location.search)
    params.set(ParameterPrefixKeys.album + ParameterKeys.order, order)
    params.set(ParameterPrefixKeys.album + ParameterKeys.sortType, sortType)
    history.push(`${history.location.pathname}?${params.toString()}`)
  }

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <SearchKeywordComponent type={"album"}/>
          </Grid>
          <Grid item>
            <OrderComponent
              label="アルバム表示順"
              value={order}
              onChange={handleChange}
              minWidth={150}
              selectItems={[
                { label: "発売日新しい順", value: "RELEASE.DESC" },
                { label: "発売日古い順", value: "RELEASE.ASC" },
                { label: "追加日新しい順", value: "NEW.DESC" },
                { label: "追加日古い順", value: "NEW.ASC" },
                { label: "人気順", value: "POPULARITY.DESC" },
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          spacing={1}
        >
          {content}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AlbumsLayout;
