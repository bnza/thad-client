export const state = () => ({
  counter: 0,
})

export const mutations = {
  increment(state) {
    state.counter++
  },
}

export const actions = {
  a({commit}) {
    commit('increment')
  },
  nuxtClientInit({dispatch}) {
    dispatch('vocabularies/fetch')
  }
}
