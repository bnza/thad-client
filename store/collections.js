import Vue from "vue";
import { has } from "ramda";

export const state = () => ({})

/**
 * NavigationOption type definition
 * @typedef {Object} NavigationOption
 * @property {Object} navigation
 * @property {Object} filters
 */

/**
 * NavigationOption type definition
 * @typedef {Object} VuetifyPaginationOption
 * @property {number} page
 * @property {number} itemsPerPage
 * @property {string[]} sortBy
 * @property {boolean[]} sortDesc
 * @property {string[]} groupBy:
 * @property {boolean[]} groupDesc
 * @property {boolean} multiSort
 * @property {boolean} mustSort
 */


export const mutations = {
  /**
   * @param {Object} state
   * @param {string} componentId
   * @param {NotificationOptions} options
   */
  set(state, componentId, options) {
    state[componentId] = options
  },
  /**
   *
   * @param {Object} state
   * @param {string} componentId
   * @param {VuetifyPaginationOption} options
   */
  setPagination(state, {componentId, options}) {
    if (!has(componentId, state)) {
      Vue.set(state, componentId, {})
    }
    Vue.set(state[componentId], 'pagination', options)
   }
}

export const getters = {
  get: (state) => (componentId) => state[componentId],
  getPagination: (state) => (componentId) => {
    return state[componentId]?.pagination
  }
}

