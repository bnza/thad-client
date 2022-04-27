import {mergeLeft, map, is, has} from "ramda";

const formatPaginationOptions = (options) =>
{
  const paginationOptions = {}

  const castSortOrderAsString = sortDesc => sortDesc ? 'desc' : 'asc'
  if (Array.isArray(options.sortBy)) {
    paginationOptions.order = {}

    options.sortBy.forEach((v,i) => {
      paginationOptions.order[v] = castSortOrderAsString(options.sortDesc[i])
    })
  }
  paginationOptions.page = options.page || 1
  paginationOptions.pagination = has('pagination', options) ? options.pagination : true
  if (has('itemsPerPage', options)) {
    paginationOptions.itemsPerPage = options.itemsPerPage
  }
  
  return paginationOptions
}

export const formatOptionsArrayForQueryString = (options) => {
  let requestOptions = {}
  if (has('pagination', options)) {
    requestOptions = mergeLeft(formatPaginationOptions(options.pagination), {})
  }
  if (has('filters', options)) {
    requestOptions = mergeLeft(options.filters, requestOptions)
  }
  return requestOptions
}

export const normalizeRequestBodyData = (data) => {
  return map(v => is(String)(v) ? v || null : v, data)
}
