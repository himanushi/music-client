import React, { useState } from 'react';
import { useArtistsQuery, ArtistsQueryVariables, Artist } from '../../../graphql/types.d';
import { Grid } from '@material-ui/core';
import PaginationComponent from '../../../components/pagination/paginationComponent';
import ArtistItemLayout from '../item/ArtistItemLayout';
import useParameters, { ParameterPrefixKeys, ParameterKeys } from '../../../hooks/useParameters';
import { useHistory } from 'react-router-dom';
import OrderComponent from '../../../components/search/OrderComponent';
import SearchKeywordComponent from '../../../components/search/SearchKeywordComponent';

const ArtistsLayout = () => {
  const [order, setOrder] = useState<string>("NAME.DESC")
  const parameters = useParameters<ArtistsQueryVariables>("artist")
  let history = useHistory()
  const limit = 30
  const fetchPolicy = parameters.conditions?.favorite ? "cache-and-network" : "cache-first"
  const { error, data, fetchMore } = useArtistsQuery(
    {
      variables: {
        cursor: {
          offset: 0,
          limit: limit,
        },
        sort: parameters.sort,
        conditions: parameters.conditions,
      },
      fetchPolicy
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
              component={<ArtistItemLayout artist={item as Artist} width={150} />}
              no={i}
              offset={data.items.length}
              limit={limit}
              fetchMore={fetchMore}
            />
          </Grid>
      )
  }

  const orderChangeHandler = (event: React.ChangeEvent<{
    name?: string | undefined
    value: unknown
  }>, _child: React.ReactNode) => {
    const sort = event.target.value as string
    const [order, sortType] = sort.split(".")
    setOrder(sort)
    const params = new URLSearchParams(history.location.search)
    params.set(ParameterPrefixKeys.artist + ParameterKeys.order, order)
    params.set(ParameterPrefixKeys.artist + ParameterKeys.sortType, sortType)
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
      <Grid item >
        <Grid
          container
          spacing={2}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <SearchKeywordComponent type={"artist"}/>
          </Grid>
          <Grid item>
            <OrderComponent
              label="アーティスト表示順"
              value={order}
              onChange={orderChangeHandler}
              minWidth={150}
              selectItems={[
                { label: "名前降順", value: "NAME.DESC" },
                { label: "名前昇順", value: "NAME.ASC" },
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

export default ArtistsLayout
