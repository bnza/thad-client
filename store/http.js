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
  getSites({dispatch, rootGetters}) {
    const resource = rootGetters['api/getResource']('site')
    return dispatch('request',
      {
        method: 'get',
        url: resource.collectionUrl,
        headers: {
          Accept: 'application/ld+json'
        },
      })
  },
  getAreas({dispatch, rootGetters}, site) {
    const resource = rootGetters['api/getResource']('area')
    const params = {}
    if (site) {
      params['site.id'] = site
    }
    return dispatch('request',
      {
        method: 'get',
        url: resource.collectionUrl,
        headers: {
          Accept: 'application/ld+json'
        },
        params
      })
  },
  getSus({dispatch, rootGetters}, {area}) {
    const resource = rootGetters['api/getResource']('stratigraphicUnit')
    const params = {}
    if (area?.id) {
      params['area.id'] = area.id
    }
    return dispatch('request',
      {
        method: 'get',
        url: resource.collectionUrl,
        headers: {
          Accept: 'application/ld+json'
        },
        params
      })
  },
  getSu({dispatch, rootGetters}, id) {
    const resource = rootGetters['api/getResource']('stratigraphicUnit')
    return dispatch('request',
      {
        method: 'get',
        url: resource.itemUrl(id),
        headers: {
          Accept: 'application/ld+json'
        },
      })
  }
}
