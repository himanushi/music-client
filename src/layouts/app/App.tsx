import React from 'react';
import AlbumsLayout from '../albums/AlbumsLayout';
import { ApolloProvider } from '@apollo/react-common';
import client from './client';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AlbumsLayout />
    </ApolloProvider>
  );
}

export default App;
