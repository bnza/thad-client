import {compareVoc} from "~/src/utils";
export const state = () => ({
  ready: false
})

export const mutations = {
  set(state, {resourceName, data}) {
    state[resourceName] = data['hydra:member'].sort(compareVoc(resourceName))
  },
  setReady(state, flag) {
    state.ready = flag
  }
}

export const getters = {
  getVocabulary(state) {
    return function (vocabularyName) {
      return state[vocabularyName]
    }
  },
  getVocabular(_, getters) {
    return function (vocabularyName, id) {
      const voc = getters.getVocabulary(vocabularyName)
      return voc ? voc.find(_v => _v['@id'] === id) : undefined
    }
  }
}

export const actions = {
  fetch: ({commit}, vocabulary) => {
     return this.$axios.request({
      method: 'get',
      url: vocabulary.collectionUrl,
      headers: {
        Accept: 'application/ld+json'
      },
    }).then(response => commit('set', {resourceName: vocabulary.resourceName, data: response.data}))
  },
  fetchAll({commit, rootGetters}) {
    Promise.all(
      rootGetters["api/vocabularyResources"].map((voc) => {
      return this.$axios.request({
        method: 'get',
        url: voc.collectionUrl,
        headers: {
          Accept: 'application/ld+json'
        },
        params: {
          pagination: false
        }
      }).then(response => commit('set', {resourceName: voc.resourceName, data: response.data}))
    }, this)
    ).then(
      () => commit('setReady', true)
    )
  }
}
