import { mergeLeft, isEmpty, when, is, pipe, toLower, replace, toUpper, has } from 'ramda'

const resourcesNamesMap = {
  stratigraphic_units: {
    name: 'stratigraphic unit'
  }
}

export const capitalize = when(
  is(String),
  pipe(toLower, replace(/^./, toUpper()))
)

export const capitalizeFirst = when(
  is(String),
  replace(/^./, toUpper())
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

export const getResourceProperty = (resourceName, key) => {
  if (!has(resourceName, resourcesNamesMap)) {
    return resourceName
  }
  if (!has(key, resourcesNamesMap[resourceName])) {
    return resourceName
  }
  return resourcesNamesMap[resourceName][key]
}

export const roleColor = role => {
  return role ? ['error', 'warning', 'success'][['ROLE_ADMIN', 'ROLE_EDITOR', 'ROLE_USER'].indexOf(role)] || 'white' : 'white'
}

export const generatePassword = length => {

  const shuffleArray = array => {
    const _array = [...array]
    for (let i = _array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = _array[i];
      _array[i] = _array[j];
      _array[j] = temp;
    }
    return _array
  }

  const randomIndex = array => Math.floor(Math.random() * array.length)

  const randomItem = indexed => {
    const rIndex = randomIndex(indexed)
    return Array.isArray(indexed) ? indexed[rIndex] : indexed.charAt(rIndex)
  }

  length = length < 8 ? 8 : length
  const digits = '0123456789'
  const uppercases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercases = 'abcdefghijklmnopqrstuvwxyz'
  const nonWords = '!@#$%^&*()'

  const types = [digits, uppercases, lowercases, nonWords]

  const _types = []

  for (let i = 0; i < length - types.length; i++) {
    _types.push(randomItem(types))
  }

  return shuffleArray(_types.concat(types)).map(randomItem).join('')
}

export const yearsRange = (start, end) => {
  start = start || 2000;
  end = end || (new Date()).getFullYear();
  return [...Array(end - start + 1).keys()].map(x => x + start).reverse();
}
