import React, { useState } from 'react';
import { PlaylistsQueryVariables, usePlaylistsQuery, Playlist } from '../../../graphql/types.d';
import { Grid } from '@material-ui/core';
import PaginationComponent from '../../../components/pagination/paginationComponent';
import useParameters, { ParameterKeys, ParameterPrefixKeys } from '../../../hooks/useParameters';
import { useHistory } from 'react-router-dom';
import OrderComponent from '../../../components/search/OrderComponent';
import SearchKeywordComponent from '../../../components/search/SearchKeywordComponent';
import PlaylistItemLayout from '../item/PlaylistItemLayout';

const PlaylistsLayout = () => {
  const [order, setOrder] = useState<string>("NEW.DESC")
  const parameters = useParameters<PlaylistsQueryVariables>("playlist")
  let history = useHistory()
  const limit = 50
  const fetchPolicy = "cache-and-network" // "cache-first"
  const { error, data, fetchMore } = usePlaylistsQuery(
    {
      variables: {
        cursor: {
          offset: 0,
          limit: limit,
        },
        sort: parameters.sort,
        conditions: parameters.conditions,
      },
      fetchPolicy,
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
              component={<PlaylistItemLayout playlist={item as Playlist} />}
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
            <SearchKeywordComponent type={"playlist"}/>
          </Grid>
          <Grid item>
            <OrderComponent
              label="プレイリスト表示順"
              value={order}
              onChange={handleChange}
              minWidth={150}
              selectItems={[
                { label: "作成日新しい順", value: "NEW.DESC" },
                { label: "作成日古い順", value: "NEW.ASC" },
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

export default PlaylistsLayout;
