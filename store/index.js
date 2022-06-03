import Vue from "vue";

/**
 * @typedef ResetPasswordInfo
 *
 * @type {object} user
 * @property {string} email
 * @property {[string]} roles
 * @property {string} password
 */

export const state = () => ({
  apiPrefix: '',
  workSite: {},
  ready: false,
  creatingResourceParent: null,
  resetPasswordInfo: null
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
  },
  /**
   * @param state
   * @param {ResetPasswordInfo} user
   */
  setResetPasswordInfo(state, user) {
    state.resetPasswordInfo = user
  },
  clearResetPasswordInfo(state) {
    state.resetPasswordInfo = null
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
