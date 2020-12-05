import React, { useState, useContext, useEffect } from 'react'
import { FormControl, IconButton, InputLabel, OutlinedInput, InputAdornment, MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import useParameters, { ParameterPrefix, ParameterKeys, ParameterPrefixKeys } from '../../hooks/useParameters'
import { useHistory } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { red } from '@material-ui/core/colors'
import UserContext from '../../hooks/userContext'
import ChipsComponent from '../chip/ChipsComponent'
import { ArtistsQueryVariables, AlbumsQueryVariables } from '../../graphql/types.d'

const SearchKeywordComponent = ({ type }:{ type:ParameterPrefix }) => {
  let history = useHistory()
  const { state } = useContext(UserContext)
  const params = useParameters<ArtistsQueryVariables|AlbumsQueryVariables>(type)
  const [canSearch, setCanSearch]   = useState<boolean>(false)
  const [keyword, setKeyword]   = useState<string>(() => {
    return params.conditions?.name ? params.conditions?.name : ""
  })
  const [onlyFavorite, setOnlyFavorite] = useState<boolean>(() => {
    return params.conditions?.favorite ? true : false
  })
  const [usernames, setUsernames] = useState<string[]>(() => {
    return params.conditions?.usernames ? params.conditions?.usernames : []
  })

  // 検索実行
  useEffect(() => {
    if(!canSearch) return

    const params = new URLSearchParams(history.location.search)
    if(keyword !== "") {
      params.set(ParameterPrefixKeys[type] + ParameterKeys.keyword, keyword)
    } else {
      params.delete(ParameterPrefixKeys[type] + ParameterKeys.keyword)
    }

    // お気に入りのみ表示
    if(onlyFavorite) {
      params.set(ParameterPrefixKeys[type] + ParameterKeys.favorite, "1")
    } else {
      params.delete(ParameterPrefixKeys[type] + ParameterKeys.favorite)
    }

    // ユーザーお気に入り表示
    if(usernames.length > 0) {
      params.set(ParameterPrefixKeys[type] + ParameterKeys.username, usernames.join("-"))
    } else {
      params.delete(ParameterPrefixKeys[type] + ParameterKeys.username)
    }

    history.push(`${history.location.pathname}?${params.toString()}`)

    setCanSearch(false)
  }, [canSearch, history, keyword, onlyFavorite, type, usernames])

  // キーワードからユーザー名とハッシュタグを作成する
  useEffect(() => {
    // 最後の文字がスペース区切りの場合のみ作成
    if(keyword.match(/\s$/)) {
      const keywords = keyword.split(/\s/)
      keywords.forEach((_keyword) => {
        if(_keyword.startsWith("@") && usernames.indexOf(_keyword) === -1) {
          setUsernames(usernames.concat(_keyword.slice(1, _keyword.length)))
          setKeyword(keyword.replace(_keyword, "").trim())
          setCanSearch(true)
        }
      })
    }
  }, [keyword, usernames])

  // ユーザーお気に入り検索
  const onDelete = (label: string) => {
    setUsernames(usernames.filter(name => name !== label))
    setCanSearch(true)
  }
  let usernamesContent = <><ChipsComponent color="yellow" labels={usernames} onDelete={onDelete} /></>

  // お気に入りボタンクリック
  const favoriteClickHandler = (_event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void => {
    setOnlyFavorite(!onlyFavorite)
    setCanSearch(true)
  }

  // 検索ボタンクリック
  const clickHandler = (_event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void => {
    setCanSearch(true)
  }

  // エンターでも検索可能にする
  const keyPressHandler = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if(event.keyCode === 13){
      setCanSearch(true)
    }
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
    case 'playlist':
      searchType = "プレイリスト"
      break
  }

  let favoriteContent = <></>
  if(state.user && state.user.role.allowedActions.includes("changeFavorites")){
    favoriteContent =
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
  }

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="ord">{ searchType + "検索" }</InputLabel>
      <OutlinedInput
        onChange={(e)=>{setKeyword(e.target.value as string)}}
        onKeyDown={keyPressHandler}
        // ユーザーとハッシュタグ
        startAdornment={
          usernamesContent
        }
        // お気に入りと検索ボタン
        endAdornment={
          <InputAdornment position="end">
            {favoriteContent}
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
