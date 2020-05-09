import { useLocation } from "react-router-dom"
import _ from "lodash"

export const ParameterKeys = {
  keyword:  "q",
  ids:      "i",
  status:   "t",
  order:    "o",
  sortType: "s",
}

export const ParameterPrefixKeys = {
  album:  "b",
  artist: "a",
}

export type ParameterPrefix = keyof typeof ParameterPrefixKeys;

export default function useParameters<T>(prefix:ParameterPrefix){
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const prefixKey = ParameterPrefixKeys[prefix]

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

  let parameters = {}

  // ID
  getUniqueValues(prefixKey + ParameterKeys.ids).forEach((value) => {
    switch( true ){
      case /^art/.test(value):
        parameters = _.merge(parameters, { conditions: { artists: { id: [value] } } })
        break;
      case /^abm/.test(value):
        parameters = _.merge(parameters, { conditions: { albums: { id: [value] } } })
        break;
      case /^trk/.test(value):
        parameters = _.merge(parameters, { conditions: { tracks: { id: [value] } } })
        break;
    }
  })

  // ステータス
  getUniqueValues(prefixKey + ParameterKeys.status).forEach((value) => {
    parameters = _.merge(parameters, { conditions: { status: [value] } })
  })

  // 並び順対象
  getUniqueValues(prefixKey + ParameterKeys.order).forEach((value) => {
    parameters = _.merge(parameters, { sort: { order: value } })
  })

  // 並び順
  getUniqueValues(prefixKey + ParameterKeys.sortType).forEach((value) => {
    parameters = _.merge(parameters, { sort: { type: value } })
  })

  return parameters as T
}
