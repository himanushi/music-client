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
      case /^art/.test(condition_id):
        conditions = _.merge(conditions, { artists: { id: [condition_id] } })
        break;
      case /^abm/.test(condition_id):
        conditions = _.merge(conditions, { albums: { id: [condition_id] } })
        break;
      case /^trk/.test(condition_id):
        conditions = _.merge(conditions, { tracks: { id: [condition_id] } })
        break;
    }
  })

  // ステータス
  getUniqueValues("s").forEach((status) => {
    switch( status ){
      case "p":
        conditions = _.merge(conditions, { status: ["PENDING"] })
        break;
      case "a":
        conditions = _.merge(conditions, { status: ["ACTIVE"] })
        break;
      case "i":
        conditions = _.merge(conditions, { status: ["IGNORE"] })
        break;
    }
  })

  return conditions as T
}
