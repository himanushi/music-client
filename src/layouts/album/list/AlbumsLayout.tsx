import React, { useState } from 'react';
import { useAlbumsQuery, Album, AlbumsQueryVariables } from '../../../graphql/types.d';
import AlbumItemLayout from '../item/AlbumItemLayout';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import PaginationComponent from '../../../components/pagination/paginationComponent';
import useParameters, { ParameterKeys, ParameterPrefixKeys } from '../../../hooks/useParameters';
import { useHistory } from 'react-router-dom';

const AlbumsLayout = () => {
  const [order, setOrder] = useState<string>("release.desc")
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
      direction="column"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item >
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid>
            <FormControl variant="outlined" style={{minWidth: 150}}>
              <InputLabel id="demo-simple-select-outlined-label">アルバム表示順</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={order}
                onChange={handleChange}
                label="アルバム表示順"
              >
                <MenuItem value={"release.desc"}>発売日新しい順</MenuItem>
                <MenuItem value={"release.asc"}>発売日古い順</MenuItem>
                <MenuItem value={"new.desc"}>追加日新しい順</MenuItem>
                <MenuItem value={"new.asc"}>追加日古い順</MenuItem>
                <MenuItem value={"popularity.desc"}>人気順</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          justify="center"
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
