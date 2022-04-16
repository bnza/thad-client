import {clone, mergeLeft} from "ramda";
import {hasOwnProperty} from "~/src/utils";

export const setAuthorizationHeader = (token, headers) => {
  headers = clone(headers || {})

  if (!hasOwnProperty(headers, 'Authorization')) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

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
  paginationOptions.pagination = hasOwnProperty(options, 'pagination') ? options.pagination : true
  paginationOptions.itemsPerPage = options.itemsPerPage || 10

  return paginationOptions
}

export const formatOptionsArrayForQueryString = (options) => {
  let requestOptions = {}
  if (hasOwnProperty(options, 'pagination')) {
    requestOptions = mergeLeft(formatPaginationOptions(options.pagination), {})
  }
  return requestOptions
}
