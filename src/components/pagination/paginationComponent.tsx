import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';

const PaginationComponent = (
  { component, no, offset, limit, fetchMore }:
  { component:JSX.Element, no:number, offset:number, limit:number, fetchMore:any }
) => {
  const [alreadyFetch, setAlreadyFetch] = useState(false)
  const fetchNo = offset - limit
  const isFetch = no === fetchNo

  const exeFetchMore = () => fetchMore({
    variables: {
      offset: offset
    },
    updateQuery: (
      prev:{ items: any[] },
      { fetchMoreResult }:{ fetchMoreResult:{ items: any[] } }
    ) => {
      if (!fetchMoreResult) return prev;
      return { ...prev, ...{ items: [...prev.items, ...fetchMoreResult.items] } }
    }
  })

  const enterFunction = () => {
    if(alreadyFetch) return
    setAlreadyFetch(true)
    return exeFetchMore()
  }

  return (
    <>
      { component }
      { isFetch ? <Waypoint onEnter={enterFunction}/> : <></> }
    </>
  )
}

export default PaginationComponent
