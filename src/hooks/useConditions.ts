import { useLocation } from "react-router-dom"
import _ from "lodash"

export default function useConditions<T>() {
  const location = useLocation()
  const queries = (new URLSearchParams(location.search).get("q") || "").split(",")
  const unique_condition_ids = new Set<string>()
  queries.forEach((query) => {
    unique_condition_ids.add(query)
  })

  const condition_ids = Array.from(unique_condition_ids)
  let conditions = {}
  condition_ids.forEach((condition_id) => {
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
