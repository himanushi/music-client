import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';

// TODO: hasNext とかないのでページ遷移によって再度取得してしまう？
const PaginationComponent = (
  { component, no, offset, limit, fetchMore }:
  { component:JSX.Element, no:number, offset:number, limit:number, fetchMore:any }
) => {
  // 並び替えなどによる内部の component の変更を検知し再度ページネーションする
  const [prevComponent, setPrevComponent] = useState(component)
  const [alreadyFetch, setAlreadyFetch] = useState(false)
  const fetchNo = offset - limit
  const isFetch = no === fetchNo

  const exeFetchMore = () => fetchMore({
    variables: {
      cursor: {
        offset: offset
      }
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
    if(alreadyFetch && prevComponent === component) return
    setAlreadyFetch(true)
    setPrevComponent(component)
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
