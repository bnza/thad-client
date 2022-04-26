export const state = () => ({
  apiPrefix: '',
  ready: false
})

export const mutations = {
  setApiPrefix(state, prefix) {
    state.apiPrefix = prefix
  },
  setReady(state) {
    state.ready = true
  },
}

export const actions = {
  nuxtClientInit({dispatch, commit}) {
    commit('setApiPrefix', this.$config.apiPrefix)
    dispatch('api/fetchEntrypoint').then(() => {
      commit('setReady')
      dispatch('vocabularies/fetchAll')
    })
  }
}
