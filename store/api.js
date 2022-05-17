import {toPairs} from "ramda";
import {capitalizeFirst} from "~/src/utils";

const toItemResourceLabel = (resourceName) => resourceName.replace(/([A-Z])/g, ' $1').toLowerCase()
const toCollectionResourceId = (resourceUrl) => resourceUrl.match(/\/(\w+)$/)[1]
const toCollectionResourceLabel = (resourceUrl) => resourceUrl.match(/\/(\w+)$/)[1].replaceAll(/_/g, ' ')
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
    collectionResourceId: toCollectionResourceId(url),
    itemPath: (id) => `${collectionPath}/${id}`,
    itemUrl: (id) => `${url}/${id}`,
    id: `#${capitalizeFirst(resourceName)}`
  }
}

const mainResources = [
  'site',
  'area',
  'smallFind',
  'stratigraphicUnit',
  'pottery',
  'ecofact',
  'cumulativePotterySheet'
]

export const state = () => ({
  Entrypoint: [],
  docs: {}
})

export const mutations = {
  setEntrypoint(state, entrypoint) {
    state.Entrypoint = toPairs(entrypoint)
  },
  setDocs(state, docs) {
    state.docs = docs
  },
}

export const getters = {
  findByType: (_ , getters) => (type) => {
    return getters.resources.find(r => r.id === `#${type}`)
  },
  resources: (state, _, rootState) => {
    const _expandResource = expandResource(rootState.apiPrefix)
    return state.Entrypoint.filter(r => r[0][0] !== '@').map(_expandResource)
  },
  mainResources: (_, getters) => getters.resources.filter(
      r => mainResources.includes(r.resourceName)
    ).sort((a, b) => mainResources.indexOf(b) - mainResources.indexOf(a)
  ),
  vocabularyResources: (_, getters) => getters.resources.filter(r => /\/vocabulary\//.test(r.collectionUrl)),
  getResource: (_, getters) => (resourceName) => getters.resources.find(r => r.resourceName === resourceName),
  getResourceClass: (state) => (resourceName) => state.docs['hydra:supportedClass']?.find(r => r['@id'] === `#${capitalizeFirst(resourceName)}`),
  getResourceClassSupportedProperty:
    (_, getters) => (resourceName, property) => {
      const resourceClass = getters.getResourceClass(resourceName)
      return resourceClass ? resourceClass['hydra:supportedProperty'].find(p => p['hydra:property']['@id'] === `#${capitalizeFirst(resourceName)}/${property}`) : null
    }
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
  },
  fetchDocs({commit}) {
    return this.$axios.request({
      method: 'get',
      url: `${this.$config.apiPrefix}/docs`,
      headers: {
        Accept: 'application/ld+json'
      },
    }).then(response => {
      commit('setDocs', response.data)
    })
  }
}
