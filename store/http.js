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
  },
  getSites({dispatch}) {
    return dispatch('request',
      {
        method: 'get',
        url: '/sites',
        headers: {
          Accept: 'application/ld+json'
        },
      })
  },
  getAreas({dispatch}, site) {
    const params = {}
    if (site) {
      params['site.id'] = site
    }
    return dispatch('request',
      {
        method: 'get',
        url: '/areas',
        headers: {
          Accept: 'application/ld+json'
        },
        params
      })
  }
}
