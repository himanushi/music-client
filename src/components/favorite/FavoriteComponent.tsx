import React, { useState, useContext, useEffect } from 'react';
import { Grid, IconButton, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { red } from '@material-ui/core/colors';
import UserContext from '../../hooks/userContext';
import { useChangeFavoritesMutation, ChangeFavoritesInput, ChangeFavoritesMutationResult, CurrentUser } from '../../graphql/types.d';

// TODO: 全体的にダサいので実装なんとかする
const FavoriteComponent = ({
  contentWidth, contentTop, favorable_type, favorable_id
}:{
  contentWidth:number, contentTop?:number, favorable_type: "artist"|"album"|"track", favorable_id:string
}) => {
  const { state, dispatch } = useContext(UserContext)
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    if(state.user && state.user.favorite) {
      const ids = state.user.favorite.albumIds.concat(state.user.favorite.artistIds).concat(state.user.favorite.trackIds)
      setFavorite(ids.includes(favorable_id))
    }
  }, [state, favorable_id])

  // お気に入り更新
  let input: ChangeFavoritesInput = { favorite: !favorite }
  let input_id:{ artistIds?: String[], albumIds?: String[], trackIds?: String[] } = {}
  if(favorable_type === "artist"){
    input_id = { artistIds: [favorable_id] }
  } else if(favorable_type === "album"){
    input_id = { albumIds: [favorable_id] }
  } else if(favorable_type === "track"){
    input_id = { trackIds: [favorable_id] }
  }
  input = { favorite: !favorite, ...input_id }
  const [changeFavorite] = useChangeFavoritesMutation({
    update: (_, response:ChangeFavoritesMutationResult) => {
      if(response.data?.changeFavorites?.currentUser){
        dispatch({ type: 'SET_USER', user: (response.data.changeFavorites.currentUser as CurrentUser) })
        setFavorite(!favorite)
      }
    },
    variables: { input },
  })

  // お気に入り機能制限
  if(state.user && state.user.role.allowedActions.includes("changeFavorites")){
    const favoriteIcon =
    <MuiThemeProvider theme={ createMuiTheme({ palette: { primary: red } })}>
      <FavoriteIcon color="primary" stroke={"white"} strokeWidth={1} />
    </MuiThemeProvider>

    const top = (contentTop ?? 5) + "px"

    return (
      <Grid container style={{ width: 24, position: "absolute", left: `${contentWidth - 35}px`, top }}>
        <IconButton onClick={(e) => {
            changeFavorite()
            // リンク遷移無効
            // TODO: 別のやり方が良いかも
            e.preventDefault()
          }} size="small">
            {
              favorite ? favoriteIcon : <FavoriteBorderIcon stroke={"gray"} strokeWidth={1}  />
            }
        </IconButton>
      </Grid>
    )
  }

  return <></>
}

export default FavoriteComponent
