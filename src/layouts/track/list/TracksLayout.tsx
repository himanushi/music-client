import React, { useContext, useRef, useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Grid, ClickAwayListener, Tooltip, IconButton } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import PreviewPlayerItemComponent from '../../../components/player/PreviewPlayerItemComponent';
import { useTracksQuery, TracksQueryVariables, Track } from '../../../graphql/types.d';
import useParameters, { ParameterPrefixKeys, ParameterKeys } from '../../../hooks/useParameters';
import PlayerContext from '../../../hooks/playerContext';
import SearchKeywordComponent from '../../../components/search/SearchKeywordComponent';
import OrderComponent from '../../../components/search/OrderComponent';
import InfoIcon from '@material-ui/icons/Info';
import Player from '../../../components/player/Player';

const TracksLayout = () => {
  const [order, setOrder] = useState<string>("NAME.DESC")
  const parameters = useParameters<TracksQueryVariables>("track")
  const [openPreviewInfo, setOpenPreviewInfo] = useState(false)
  const [openTitleInfo, setOpenTitleInfo] = useState(false)
  const { dispatch } = useContext(PlayerContext)

  const location = useLocation()
  let history = useHistory()

  const limit = 50
  const { error, data, loading } = useTracksQuery(
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

  // プレビュー画面表示時に初期化される
  const initPlayer = useRef<boolean>(true);
  const playAction = (no:number) => {
    if (!data?.items) return

    if(initPlayer.current) {
      const _player = new Player({
        linkUrl: `${location.pathname}${location.search}`,
        tracks: data.items as Track[],
        dispatch,
        canFullPlayAppleMusic: false
      })

      dispatch({ type: "SET_PLAYER", player: _player })
      initPlayer.current = false
    }
    dispatch({ type: "PLAY", no })
  }

  if (error) return <div>{error.message}</div>

  if (loading) {
    // 読み込みが発生するたびにプレイヤーをリセットする
    initPlayer.current = true
  }

  if (!data?.items) return <></>

  const handleChange = (event: React.ChangeEvent<{
    name?: string | undefined
    value: unknown
  }>, _child: React.ReactNode) => {
    const sort = event.target.value as string
    const [order, sortType] = sort.split(".")
    setOrder(sort)
    const params = new URLSearchParams(history.location.search)
    params.set(ParameterPrefixKeys.track + ParameterKeys.order, order)
    params.set(ParameterPrefixKeys.track + ParameterKeys.sortType, sortType)
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
          <SearchKeywordComponent type={"track"}/>
        </Grid>
        <Grid item>
          <OrderComponent
            label="アルバム表示順"
            value={order}
            onChange={handleChange}
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
      <TableContainer component={Paper} style={{ maxWidth: "1000px" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 100 }} align="center">
                試聴
                <ClickAwayListener onClickAway={()=>setOpenPreviewInfo(false)}>
                  <Tooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={()=>setOpenPreviewInfo(false)}
                    open={openPreviewInfo}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    placement="top-start"
                    title={ "Apple Music または Spotify のプレビューURLによるストリーミング試聴" }
                  >
                    <IconButton size="small" onClick={()=>setOpenPreviewInfo(true)}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </ClickAwayListener>
              </TableCell>
              <TableCell>
                タイトル
                <ClickAwayListener onClickAway={()=>setOpenTitleInfo(false)}>
                  <Tooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={()=>setOpenTitleInfo(false)}
                    open={openTitleInfo}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    placement="top-start"
                    title={ "50件までの検索結果が表示されます" }
                  >
                    <IconButton size="small" onClick={()=>setOpenTitleInfo(true)}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </ClickAwayListener>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data.items as Track[]).map((track, i) => {
              return <PreviewPlayerItemComponent
                        key={i}
                        track={track}
                        index={i}
                        playAction={playAction}
                        averagePopularity={100}
                      />
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  </Grid>
  )
}

export default TracksLayout
