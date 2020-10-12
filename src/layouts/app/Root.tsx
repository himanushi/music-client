import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom"
import Bar from './Bar';
import { ApolloProvider } from '@apollo/react-hoc';
import client from './client';
import ArtistsLayout from '../artist/list/ArtistsLayout';
import ArtistInfoLayout from '../artist/info/ArtistInfoLayout';
import AlbumsLayout from '../album/list/AlbumsLayout';
import AlbumInfoLayout from '../album/info/AlbumInfoLayout';
import TracksLayout from '../track/list/TracksLayout';
import UserLoginLayout from '../user/login/UserLoginLayout';
import UserLogoutLayout from '../user/logout/UserLogoutLayout';
import UserMeLayout from '../user/me/UserMeLayout';
import UserMeEditLayout from '../user/meEdit/UserMeEditLayout';
import { Grid, Container, Toolbar } from '@material-ui/core';
import { PlayerProvider } from '../../hooks/playerContext';
import PlayerBar from './PlayerBar';
import AboutLayout from '../information/AboutLayout';
import TermsLayout from '../information/TermsLayout';
import PrivacyLayout from '../information/PrivacyLayout';
import CookiePolicyLayout from '../information/CookiePolicyLayout';
import { UserProvider } from '../../hooks/userContext';
import InitializeUser from './InitializeUser';
import UserSignupLayout from '../user/signup/UserSignupLayout';
import SnackbarComponent from '../../components/infomation/SnackbarComponent';
import { InformationProvider } from '../../hooks/informationContext';
import CookieInformation from './CookieInformation';

const RootLayout = () =>
  <BrowserRouter>
    <ApolloProvider client={client}>
      <UserProvider >
        <InformationProvider>
          <PlayerProvider >
            <CookieInformation />
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
                    <Route exact path="/tracks" component={TracksLayout} />
                    <Route exact path="/signup" component={UserSignupLayout} />
                    <Route exact path="/login" component={UserLoginLayout} />
                    <Route exact path="/logout" component={UserLogoutLayout} />
                    <Route exact path="/me" component={UserMeLayout} />
                    <Route exact path="/me/edit" component={UserMeEditLayout} />
                    <Route exact path="/about" component={AboutLayout} />
                    <Route exact path="/terms" component={TermsLayout} />
                    <Route exact path="/privacy" component={PrivacyLayout} />
                    <Route exact path="/cookie_policy" component={CookiePolicyLayout} />
                  </Switch>
                </Grid>
                <Grid item>
                  {/* プレイヤーダミー */}
                  <Toolbar />
                </Grid>
                {/* お知らせ */}
                <SnackbarComponent/>
              </Grid>
            </Container>
          </PlayerProvider>
        </InformationProvider>
      </UserProvider>
    </ApolloProvider>
  </BrowserRouter>

export default RootLayout
