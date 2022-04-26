import {toPairs} from "ramda";

const toItemResourceLabel = (resourceName) => resourceName.replace(/([A-Z])/, ' $1').toLowerCase()
const toCollectionResourceLabel = (resourceUrl) => resourceUrl.match(/\/(\w+)$/)[1].replace(/_/, ' ')
const toCollectionResourcePath = (resourceUrl, apiPrefix) => resourceUrl.replace(new RegExp(`^(${apiPrefix})`), '/app')
const expandResource = (apiPrefix) => (resource) => {
  const [resourceName, url] = resource
  const collectionPath =  toCollectionResourcePath(url, apiPrefix)
  return {
    resourceName,
    collectionUrl: url,
    collectionPath,
    itemLabel: toItemResourceLabel(resourceName),
    collectionLabel: toCollectionResourceLabel(url),
    itemPath: (id) => `${collectionPath}/${id}`,
    itemUrl: (id) => `${url}/${id}`
  }
}

const mainResources = [
  'site',
  'area',
  'stratigraphicUnit',
  'pottery'
]

export const state = () => ({
  Entrypoint: [],
})

export const mutations = {
  setEntrypoint(state, entrypoint) {
    state.Entrypoint = toPairs(entrypoint)
  }
}

export const getters = {
  resources: (state, _, rootState) => {
    const _expandResource = expandResource(rootState.apiPrefix)
    return state.Entrypoint.filter(r => r[0][0] !== '@').map(_expandResource)
  },
  mainResources: (_, getters) => getters.resources.filter(
      r => mainResources.includes(r.resourceName)
    ).sort((a, b) => mainResources.indexOf(b) - mainResources.indexOf(a)
  ),
  vocabularyResources: (_, getters) => getters.resources.filter(r => /\/vocabulary\//.test(r.collectionUrl)),
  getResource: (_, getters) => (resourceName) => getters.resources.find(r => r.resourceName === resourceName)
}

export const actions = {
  fetchEntrypoint({commit}) {
    return this.$axios.request({
      method: 'get',
      url: this.$config.apiPrefix,
      headers: {
        Accept: 'application/ld+json'
      },
    }).then(response => {
      commit('setEntrypoint', response.data)
    })
  }
}
