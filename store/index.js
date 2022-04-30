import Vue from "vue";

export const state = () => ({
  apiPrefix: '',
  workSite: {},
  ready: false
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
