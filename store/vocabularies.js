const vocabulariesMap = {
  su_preservation_states: {
    url: '/vocabulary/su/preservation_states'
  },
  su_relationships: {
    url: '/vocabulary/su/relationships'
  },
  su_types: {
    url: '/vocabulary/su/types'
  }
}

const fetchVocabulary = ($axios, url) => {
  return $axios.request({
    method: 'get',
    url,
    headers: {
      Accept: 'application/ld+json'
    },
  })
}

export const state = () => ({
  su_preservation_states: [],
  su_relationships: [],
  su_types: [],

})

export const mutations = {
  set(state, {name, data}) {
    state[name] = data['hydra:member']
  },
}

export const getters = {
  getVocabulary(state) {
    return function (vocabularyName) {
      return state[vocabularyName]
    }
  }
}

export const actions = {
  fetch({commit}) {
    const $axios = this.$axios
    Object.keys(vocabulariesMap).forEach(k => {
      fetchVocabulary($axios, vocabulariesMap[k].url).then(
        res => {
          commit('set', {name: k, data: res.data})
        }
      )
    })
  }
}
