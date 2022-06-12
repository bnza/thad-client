import Vue from "vue";
import {isEmpty} from "ramda";

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
  proposedWorkSite: {},
  workSiteDialog: false,
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
  setProposedWorkSite(state, site) {
    Vue.set(state, 'proposedWorkSite', site)
  },
  setWorkSiteDialog(state, flag) {
    state.workSiteDialog = flag
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

export const getters = {
  hasWorkSite(state) {
    return !isEmpty(state.workSite)
  },
  hasProposedWorkSite(state) {
    return !isEmpty(state.proposedWorkSite)
  },
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
