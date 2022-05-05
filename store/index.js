import Vue from "vue";

export const state = () => ({
  apiPrefix: '',
  workSite: {},
  ready: false,
  creatingResourceParent: null
})

export const mutations = {
  setApiPrefix(state, prefix) {
    state.apiPrefix = prefix
  },
  setReady(state) {
    state.ready = true
  },
  setWorkSite(state, site) {
    Vue.set(state, 'workSite', site)
  },
  setCreatingResourceParent(state, parent) {
    Vue.set(state, 'creatingResourceParent', parent)
  }
}

export const actions = {
  nuxtClientInit({dispatch, commit}) {
    commit('setApiPrefix', this.$config.apiPrefix)
    dispatch('api/fetchEntrypoint').then(() => {
      dispatch('api/fetchDocs')
      commit('setReady')
      dispatch('vocabularies/fetchAll')
    })
  }
}
