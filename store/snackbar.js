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
  show({commit}, snackbar) {
    commit('resetTimeout')
    commit('set', snackbar)
  },
  requestError({commit}, error) {
    commit('resetTimeout')
    let text = '';
    if (error.response) {
      const title = error.response.data['hydra:title']
      text = `${title}: [${error.response.status}]\n`+
        error.response.data['hydra:description']
    } else {
      text = error.message
    }
    commit('set', {
      text,
      color: 'error',
      timeout: -1
    })
  }
}

