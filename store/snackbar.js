/**
 * @typedef {Object} SnackbarData
 * @property {string} text
 * @property {string} [color]
 * @property {number} [timeout=5000]
 */

export const state = () => ({
  visible: false,
  color: undefined,
  timeout: 5000,
  text: ''
})

export const mutations = {
  set(state, {text, color=undefined, timeout=5000}) {
    state.text = text
    state.color = color
    state.timeout = timeout
    state.visible = true
  },
  resetTimeout(state) {
    state.visible=false
    state.timeout = -1
  },
  setVisible(state, value) {
    state.visible = value
  }
}

export const getters = {
  closeable(state) {
    return state.timeout === -1
  }
}

export const actions = {
  /**
   *
   * @param commit
   * @param {SnackbarData} snackbar
   */
  show({commit}, snackbar) {
    commit('resetTimeout')
    commit('set', snackbar)
  },
  requestError({commit}, error) {
    commit('resetTimeout')
    let text = '';
    if (error.response && error.response.data['hydra:title']) {
      const title = error.response.data['hydra:title']
      text = `${title}: [${error.response.status}]\n`+
        error.response.data['hydra:description']
    } else if (error.response.data.message) {
      text = error.response.data.message
    } else if (error.response.status) {
      text = `${error.response.statusText}: [${error.response.status}]`
    }
    else {
      text = error.message
    }
    commit('set', {
      text,
      color: 'error',
      timeout: -1
    })
  }
}

