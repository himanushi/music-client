import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from "apollo-link-error"

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URI, credentials: 'same-origin' })
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

export default new ApolloClient({
  link,
  cache: new InMemoryCache({ dataIdFromObject: object => object.id })
})
