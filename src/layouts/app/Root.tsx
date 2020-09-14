import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom"
import AlbumsLayout from '../album/list/AlbumsLayout';
import Bar from './Bar';
import { ApolloProvider } from '@apollo/react-hoc';
import client from './client';
import AlbumInfoLayout from '../album/info/AlbumInfoLayout';
import ArtistsLayout from '../artist/list/ArtistsLayout';
import ArtistInfoLayout from '../artist/info/ArtistInfoLayout';
import UserSigninLayout from '../user/signin/UserSigninLayout';
import UserMeLayout from '../user/me/UserMeLayout';
import { Grid, Container, Toolbar } from '@material-ui/core';
import { PlayerProvider } from '../../hooks/playerContext';
import PlayerBar from './PlayerBar';
import AboutLayout from '../information/AboutLayout';
import { UserProvider } from '../../hooks/userContext';
import InitializeUser from './InitializeUser';

const RootLayout = () =>
  <BrowserRouter>
    <ApolloProvider client={client}>
      <UserProvider >
        <PlayerProvider >
          <InitializeUser />
          {/* アプリバー */}
          <Bar />
          {/* プレイヤー */}
          <PlayerBar />
          <Container style={{ flexGrow: 1 }}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                {/* アプリバーダミー */}
                <Toolbar />
              </Grid>
              <Grid item>
                <Switch>
                  <Route exact path="/" component={AlbumsLayout} />
                  <Route exact path="/artists" component={ArtistsLayout} />
                  <Route exact path="/artists/:id" component={ArtistInfoLayout} />
                  <Route exact path="/albums" component={AlbumsLayout} />
                  <Route exact path="/albums/:id" component={AlbumInfoLayout} />
                  {/* <Route exact path="/tracks" component={TracksLayout} /> */}
                  <Route exact path="/signin" component={UserSigninLayout} />
                  <Route exact path="/me" component={UserMeLayout} />
                  <Route exact path="/about" component={AboutLayout} />
                </Switch>
              </Grid>
              <Grid item>
                {/* プレイヤーダミー */}
                <Toolbar />
              </Grid>
            </Grid>
          </Container>
        </PlayerProvider>
      </UserProvider>
    </ApolloProvider>
  </BrowserRouter>

export default RootLayout
