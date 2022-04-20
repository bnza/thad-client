import { mergeLeft, isEmpty, when, is, pipe, toLower, replace, toUpper } from 'ramda'

export const capitalize = when(
  is(String),
  pipe(toLower, replace(/^./, toUpper()))
)

export const hasOwnProperty = (object, key) =>
  object &&
  typeof object === 'object' &&
  Object.prototype.hasOwnProperty.call(object, key)

const parseBool = v => !["false", 0, false].includes(v)
export const paginationQueryToOptions =  options => {
  if (isEmpty(options)) {
    return options
  }
  return mergeLeft({
    page: parseInt(options.page),
    itemsPerPage: parseInt(options.itemsPerPage),
    sortDesc: options.sortDesc.map(parseBool),
    multiSort: parseBool(options.multiSort),
    mustSort: parseBool(options.mustSort)
  },
    options
  )
}

export const optionsToPaginationQuery = (options, tab, query) => {
  let _query = { p: options}
  if (tab) {
    _query = {
      tabs: {
        [tab]: _query
      }
    }
  }
  return mergeLeft(_query, query)
}
