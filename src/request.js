import {mergeLeft, map, is, has, clone} from "ramda";

const workSiteFilterableResources = {
  sites: 'id',
  areas: 'site.id',
  stratigraphic_units: 'site.id',
  potteries: 'stratigraphicUnit.site.id',
  ecofacts: 'stratigraphicUnit.site.id',
  small_finds: 'stratigraphicUnit.site.id',
  cumulative_pottery_sheet: 'stratigraphicUnit.site.id',
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

export const normalizeResourceId = resource => resource['@id'] || null

export const normalizeResource = (item) => (key) => item[key] ? normalizeResourceId(item[key]) : null

export const downloadCsv = (resourceName, data) => {
  const fileURL = window.URL.createObjectURL(new Blob([data]));
  const fileLink = document.createElement('a');
  fileLink.href = fileURL;
  fileLink.setAttribute('download', `export-${resourceName}.csv`);
  document.body.appendChild(fileLink);
  fileLink.click();
  fileLink.remove()
}
