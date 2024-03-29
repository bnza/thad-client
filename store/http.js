import {stringify} from 'qs'
import {filterByWorkSite} from "~/src/request";

export const state = () => ({
  counter: 0,
})

export const mutations = {
  increment(state) {
    ++state.counter
  }
}

export const actions = {
  request({rootState}, axiosRequestConfig) {
    const arc = filterByWorkSite(rootState.workSite.id, axiosRequestConfig)
    arc.paramsSerializer = params => stringify(params)
    return this.$axios.request(arc)
  },
  nextRequestCounter({commit, state}) {
    commit('increment')
    return state.counter
  },
  invalidateToken({dispatch}, refreshToken) {
    return dispatch('request',
      {
        method: 'post',
        url: 'api/token/invalidate',
        headers: {
          Accept: 'application/ld+json'
        },
        data: {
          refresh_token: refreshToken
        }
      })
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
  getAreaCodes({dispatch, rootGetters}, {site, code}) {
    const resource = rootGetters['api/getResource']('area')
    const params = {
      pagination: true,
      itemsPerPage: 50
    }
    if (site) {
      params.site = site
    }
    if (code) {
      params['appId.code'] = code
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
  getSuCodes({dispatch, rootGetters}, {area, code}) {
    const resource = rootGetters['api/getResource']('stratigraphicUnit')
    const params = {
      pagination: true,
      itemsPerPage: 50,
    }
    if (area?.id) {
      params['area.id'] = area.id
    }
    if (code) {
      params['appId.code'] = code
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
  getGraveCodes({dispatch, rootGetters}, {area, code}) {
    const resource = rootGetters['api/getResource']('grave')
    const params = {
      pagination: true,
      itemsPerPage: 50,
    }
    if (area?.id) {
      params['area.id'] = area.id
    }
    if (code) {
      params['appId.code'] = code
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
  getResourceItem({dispatch, rootGetters}, {resourceName, id}) {
    const resource = rootGetters['api/getResource'](resourceName)
    return dispatch('request',
      {
        method: 'get',
        url: resource.itemUrl(id),
        headers: {
          Accept: 'application/ld+json'
        },
      })
  },
  getNominatives({dispatch}, {apiPrefix, search}) {
    const params = {}
    if (search) {
      params.name = search
    }
    return dispatch('request',
      {
        method: 'get',
        url: `${apiPrefix}/nominatives`,
        headers: {
          Accept: 'application/json'
        },
        params
      })
  },
  getTypologies({dispatch}, {apiPrefix, search}) {
    const params = {}
    if (search) {
      params.code = search
    }
    return dispatch('request',
      {
        method: 'get',
        url: `${apiPrefix}/typologies`,
        headers: {
          Accept: 'application/json'
        },
        params
      })
  },
  async isUniqueNumberInSite({dispatch, rootGetters}, {resourceName, siteId, number}) {
    const resource = rootGetters['api/getResource'](resourceName)
    if (!siteId || !number) {
      return true
    }
    const response = await dispatch('request',
      {
        method: 'get',
        url: resource.collectionUrl,
        headers: {
          Accept: 'application/ld+json'
        },
        params: {
          'site.id': siteId,
          number
        }
      })
    return !response.data['hydra:totalItems']
  },
  async isUniqueNumberInSU({dispatch, rootGetters}, {resourceName, suId, number}) {
    const resource = rootGetters['api/getResource'](resourceName)
    if (!suId || !number) {
      return true
    }
    const response = await dispatch('request',
      {
        method: 'get',
        url: resource.collectionUrl,
        headers: {
          Accept: 'application/ld+json'
        },
        params: {
          'stratigraphicUnit.id': suId,
          number
        }
      })
    return !response.data['hydra:totalItems']
  }
}
