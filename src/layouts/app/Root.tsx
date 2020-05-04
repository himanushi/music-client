import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom"
import AlbumsLayout from '../album/list/AlbumsLayout';
import Bar from './Bar';
import AlbumInfoLayout from '../album/info/AlbumInfoLayout';
import ArtistsLayout from '../artist/list/ArtistsLayout';
import ArtistInfoLayout from '../artist/info/ArtistInfoLayout';
import UserSigninLayout from '../user/signin/UserSigninLayout';
import UserMeLayout from '../user/me/UserMeLayout';
import { ApolloPersistentProvider } from './ApolloPersistentProvider';

const RootStyleLayout = () =>
  <BrowserRouter>
    <ApolloPersistentProvider>
      <Bar />
      <Switch>
        <Route exact path="/" component={AlbumsLayout} />
        <Route exact path="/artists" component={ArtistsLayout} />
        <Route exact path="/artists/:id" component={ArtistInfoLayout} />
        <Route exact path="/albums" component={AlbumsLayout} />
        <Route exact path="/albums/:id" component={AlbumInfoLayout} />
        <Route exact path="/signin" component={UserSigninLayout} />
        <Route exact path="/me" component={UserMeLayout} />
      </Switch>
    </ApolloPersistentProvider>
  </BrowserRouter>

export default RootStyleLayout
