import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { FormControl, IconButton, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core'
import { ParameterPrefix, ParameterKeys, ParameterPrefixKeys } from '../../hooks/useParameters'
import { useHistory } from 'react-router-dom'

const SearchKeywordComponent = ({ type }:{ type:ParameterPrefix }) => {
  const [keyword, setKeyword] = useState<string>("")
  let history = useHistory()

  // 検索ボタンクリック
  const clickHandler = (_event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void => {
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
              onClick={clickHandler}
              edge="end"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        label="検索"
        value={keyword}
      />
    </FormControl>
  )
}

export default SearchKeywordComponent
