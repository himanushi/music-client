import React, { useEffect, useState } from 'react';
import { createClient } from './apollo-client';
import { ApolloProvider } from '@apollo/react-common';
import ApolloClient from 'apollo-client'

export const ApolloPersistentProvider = (props:React.Props<any>) => {
  const [client, setClient] = useState<ApolloClient<any>|null>(null);

  useEffect(() => {
    if (client) return;
    // Do not return the result of this function, as useEffect functions
    // cannot return a promise.
    // https://github.com/facebook/react/issues/14326#issuecomment-441680293
    createClient().then(newClient => {
      setClient(newClient);
    });
  }, [client]);

  if(!client) { return <></> }

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
