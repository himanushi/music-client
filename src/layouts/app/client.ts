import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from "apollo-link-error"

const headersLink = new ApolloLink((operation, forward) => forward(operation))
const httpLink = new HttpLink({ uri: `http://localhost:3000/graphql`, credentials : 'include' })
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([headersLink, httpLink, errorLink])

export default new ApolloClient({
  link,
  cache: new InMemoryCache()
})
