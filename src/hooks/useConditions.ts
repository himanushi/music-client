import { useLocation } from "react-router-dom"
import _ from "lodash"

export default function useConditions<T>() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const getUniqueValues = (key:string):string[] => {
    const value = params.get(key)
    if(value === null) return []

    const values = value.split(",")
    const uniqueValues = new Set<string>()

    values.forEach((value) => {
      uniqueValues.add(value)
    })

    return Array.from(uniqueValues)
  }

  let conditions = {}

  // ID
  getUniqueValues("q").forEach((condition_id) => {
    switch( true ){
      case /^arst/.test(condition_id):
        conditions = _.merge(conditions, { artists: { id: [condition_id] } })
        break;
      case /^albm/.test(condition_id):
        conditions = _.merge(conditions, { albums: { id: [condition_id] } })
        break;
      case /^trak/.test(condition_id):
        conditions = _.merge(conditions, { tracks: { id: [condition_id] } })
        break;
    }
  })

  return conditions as T
}
