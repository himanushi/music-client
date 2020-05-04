import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { persistCache } from 'apollo-cache-persist'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types'
import { onError } from "apollo-link-error"

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URI, credentials: 'include' })
const headersLink = new ApolloLink((operation, forward) => forward(operation))
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([headersLink, errorLink, httpLink])

const cache = new InMemoryCache({ dataIdFromObject: object => object.id })

// ref: https://github.com/apollographql/apollo-cache-persist/issues/62#issuecomment-522726218
export const createClient = async () => {
  await persistCache({
    cache,
    storage: window.localStorage as PersistentStorage<PersistedData<NormalizedCacheObject>>,
    debug: true
  })

  return new ApolloClient({
    link,
    cache,
  })
}
