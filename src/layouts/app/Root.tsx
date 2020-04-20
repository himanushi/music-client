import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom"
import AlbumsLayout from '../album/albums/AlbumsLayout';
import Bar from './Bar';
import { ApolloProvider } from '@apollo/react-hoc';
import client from './client';
import AlbumInfoLayout from '../album/albumInfo/AlbumInfoLayout';
import ArtistsLayout from '../artist/artists/ArtistsLayout';

const RootStyleLayout = () =>
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Bar />
      <Switch>
        <Route exact path="/artists" component={ArtistsLayout} />
        <Route exact path="/albums" component={AlbumsLayout} />
        <Route path="/albums/:id" component={AlbumInfoLayout} />
      </Switch>
    </ApolloProvider>
  </BrowserRouter>

export default RootStyleLayout
