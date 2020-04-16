import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const headersLink = new ApolloLink((operation, forward) => {
  return forward(operation)
})

let endpoint = 'http://0.0.0.0:3000/graphql'

if(process.env.NODE_ENV === 'production') {
  endpoint = 'https://music-server.himacloud.app/graphql'
}

const httpLink = new HttpLink({ uri: endpoint })
const link = ApolloLink.from([headersLink, httpLink])

export default new ApolloClient({
  link,
  cache: new InMemoryCache()
})
