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
  }
}

