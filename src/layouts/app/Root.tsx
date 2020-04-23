import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom"
import AlbumsLayout from '../album/list/AlbumsLayout';
import Bar from './Bar';
import { ApolloProvider } from '@apollo/react-hoc';
import client from './client';
import AlbumInfoLayout from '../album/info/AlbumInfoLayout';
import ArtistsLayout from '../artist/list/ArtistsLayout';
import ArtistInfoLayout from '../artist/info/ArtistInfoLayout';

const RootStyleLayout = () =>
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Bar />
      <Switch>
        <div style={{ padding: "0 1%" }}>
          <Route exact path="/artists" component={ArtistsLayout} />
          <Route exact path="/artists/:id" component={ArtistInfoLayout} />
          <Route exact path="/albums" component={AlbumsLayout} />
          <Route exact path="/albums/:id" component={AlbumInfoLayout} />
        </div>
      </Switch>
    </ApolloProvider>
  </BrowserRouter>

export default RootStyleLayout
