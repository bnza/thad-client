import {has, isEmpty} from "ramda";

const getResponseValue = (key, item) => {
  if (isEmpty(item)) {
    return
  }
  return key.split('.').reduce((obj, key) => {
    if (obj && has(key, obj)) {
      return obj[key]
    }
    return undefined
  }, item)
}
const codeFormatters = {
  sites: item => item.code || '',
  areas: item => `${getResponseValue('site.code', item)}.${item.code}`,
  stratigraphic_units: item => `${getResponseValue('site.code', item)}.${getResponseValue('date', item).substring(2,4)}.SU.${item.number.toString().padStart(5,'0')}`
}

export default {
  computed: {
    ready() {
      return !isEmpty(this.responseData)
    },
  },
  methods: {
    getResponseValue(key, item) {
      return getResponseValue(key, item || this.responseData)
    },
    getResponseDateString(key) {
      const date = this.getResponseValue(key)
      if (!date) {
        return date
      }
      return (new Date(date)).toLocaleDateString()
    },
    formatCode(resourceName, item) {
      if (has(resourceName, codeFormatters)) {
        return codeFormatters[resourceName](item)
      }
    },
  },
}
