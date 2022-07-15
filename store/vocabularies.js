export const state = () => ({
  ready: false
})

export const mutations = {
  set(state, {resourceName, data}) {
    state[resourceName] = data['hydra:member']
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
