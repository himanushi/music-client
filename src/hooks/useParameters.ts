import { useLocation } from "react-router-dom"
import _ from "lodash"
import { StatusEnum } from "../graphql/types.d";

export const ParameterPrefixKeys = {
  album:  "b",
  artist: "a",
}

export const ParameterKeys = {
  keyword:  "q",
  ids:      "i",
  status:   "s",
  order:    "o",
  sortType: "r",
//tag:      "t", // いつか実装する
}

export type ParameterPrefix = keyof typeof ParameterPrefixKeys;

export default function useParameters<T>(prefix:ParameterPrefix){
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const prefixKey = ParameterPrefixKeys[prefix]

  const getUniqueValues = (key:string):string[] => {
    const value = params.get(key)
    if(value === null) return []

    // , ではなく - にしている理由は文字化けするからURLセーフな - または _ にする必要あり
    const values = value.split("-")
    const uniqueValues = new Set<string>()

    values.forEach((value) => {
      uniqueValues.add(value)
    })

    return Array.from(uniqueValues)
  }

  const customizer = (objValue:any, srcValue:any) => {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue)
    }
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
  let status = { status: [] }
  getUniqueValues(prefixKey + ParameterKeys.status).forEach((value) => {
      status = _.mergeWith(status, { status: [value] }, customizer)
  })
  if(status.status.length !== 0) {
    parameters = _.mergeWith(parameters, { conditions: { ...status } })
  }

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
