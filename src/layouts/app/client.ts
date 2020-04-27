import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const headersLink = new ApolloLink((operation, forward) => {
  return forward(operation)
})

const httpLink = new HttpLink({ uri: `http://localhost:3000/graphql` })
const link = ApolloLink.from([headersLink, httpLink])

export default new ApolloClient({
  link,
  cache: new InMemoryCache()
})
