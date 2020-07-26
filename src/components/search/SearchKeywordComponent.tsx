import React, { useState } from 'react'
import { FormControl, IconButton, InputLabel, OutlinedInput, InputAdornment, MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { ParameterPrefix, ParameterKeys, ParameterPrefixKeys } from '../../hooks/useParameters'
import { useHistory, useLocation } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { red } from '@material-ui/core/colors'

const SearchKeywordComponent = ({ type }:{ type:ParameterPrefix }) => {
  let history = useHistory()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const [keyword, setKeyword]   = useState<string>("")
  const [onlyFavorite, setOnlyFavorite] = useState(() => {
    if(params.get(ParameterPrefixKeys[type] + ParameterKeys.favorite) === "1") return true
    return false
  })

  // 検索ボタンクリック
  const clickHandler = (_event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void => {
    search()
  }

  // お気に入りボタンクリック
  const favoriteClickHandler = (_event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void => {
    setOnlyFavorite(!onlyFavorite)
    search()
  }

  // エンターでも検索可能にする
  const keyPressHandler = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if(event.keyCode === 13){
      search()
    }
  }

  const search = () => {
    const params = new URLSearchParams(history.location.search)
    if(keyword !== "") {
      params.set(ParameterPrefixKeys[type] + ParameterKeys.keyword, keyword)
    } else {
      params.delete(ParameterPrefixKeys[type] + ParameterKeys.keyword)
    }

    // お気に入りのみ表示
    // 検索したタイミングでは真偽値が逆になる
    if(!onlyFavorite) {
      params.set(ParameterPrefixKeys[type] + ParameterKeys.favorite, "1")
    } else {
      params.delete(ParameterPrefixKeys[type] + ParameterKeys.favorite)
    }

    history.push(`${history.location.pathname}?${params.toString()}`)
  }

  let searchType = ""
  switch(type) {
    case 'artist':
      searchType = "アーティスト"
      break
    case 'album':
      searchType = "アルバム"
      break
    case 'track':
      searchType = "曲"
      break
  }

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="ord">{ searchType + "検索" }</InputLabel>
      <OutlinedInput
        onChange={(e)=>{setKeyword(e.target.value as string)}}
        onKeyDown={keyPressHandler}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={favoriteClickHandler}
              edge="end"
            >
              { onlyFavorite ?
                  <MuiThemeProvider theme={createMuiTheme({ palette: { primary: red } })}>
                    <FavoriteIcon color="primary" stroke={"white"} strokeWidth={2} />
                  </MuiThemeProvider>
                :
                  <FavoriteBorderIcon /> }
            </IconButton>
            <IconButton
              onClick={clickHandler}
              edge="end"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        label={ searchType + "検索" }
        value={keyword}
      />
    </FormControl>
  )
}

export default SearchKeywordComponent
