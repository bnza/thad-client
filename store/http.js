import qs from 'qs'

export const state = () => ({
  counter: 0,
})

export const mutations = {
  increment(state) {
    ++state.counter
  }
}

export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  request({commit}, axiosRequestConfig) {
    axiosRequestConfig.paramsSerializer = params => qs.stringify(params)
    return this.$axios.request(axiosRequestConfig)
  },
  nextRequestCounter({commit, state}) {
    commit('increment')
    return state.counter
  }
}
