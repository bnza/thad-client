import {mergeLeft, map, is, has, clone} from "ramda";

const workSiteFilterableResources = {
  sites: 'id',
  areas: 'site.id',
  stratigraphic_units: 'site.id',
  potteries: 'su.site.id'
}

const workSiteResourcesRegex = new RegExp(`/(?<resource>${Object.keys(workSiteFilterableResources).join('|')})/?`)

export const filterByWorkSite = (workSiteId, axiosRequestConfig) => {
  if (workSiteId && axiosRequestConfig.method.toLowerCase() === 'get') {
    const matches = axiosRequestConfig.url.match(workSiteResourcesRegex)
    if (matches) {
      const params = has('params', axiosRequestConfig) ? clone(axiosRequestConfig.params) : {}
      params[workSiteFilterableResources[matches.groups.resource]] = workSiteId
      axiosRequestConfig.params = params
    }
  }
  return axiosRequestConfig
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
