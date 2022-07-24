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
   * @param {Object} state
   * @param {string} componentId
   * @param {VuetifyPaginationOption} options
   */
  setPagination(state, {componentId, options}) {
    if (!has(componentId, state)) {
      Vue.set(state, componentId, {})
    }
    Vue.set(state[componentId], 'pagination', options)
   },
  /**
   * @param {Object} state
   * @param {string} componentId
   * @param {VuetifyPaginationOption} filters
   */
  setFilters(state, {componentId, filters}) {
    if (!has(componentId, state)) {
      Vue.set(state, componentId, {})
    }
    Vue.set(state[componentId], 'filters', filters)
  },
  setCodeFilter(state, {componentId, filter}) {
    if (!has(componentId, state)) {
      Vue.set(state, componentId, {})
    }
    Vue.set(state[componentId], 'codeFilter', filter)
  },
}

export const getters = {
  get: (state) => (componentId) => state[componentId],
  getPagination: (state) => (componentId) => {
    return state[componentId]?.pagination
  },
  getFilters: (state) => (componentId) => {
    return state[componentId]?.filters || []
  },
  getCodeFilter: (state) => (componentId) => {
    return state[componentId]?.codeFilter
  }
}

