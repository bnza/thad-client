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
const twoDigitYear = su => `${getResponseValue('year', su)}`.substring(2,4)
const paddedSUNumber = su => su.number.toString().padStart(5,'0')
const codeFormatters = {
  site: item => item.code || '',
  area: item => `${getResponseValue('site.code', item)}.${item.code}`,
  stratigraphicUnit: item => `${getResponseValue('site.code', item)}.${twoDigitYear(item)}.SU.${paddedSUNumber(item)}`,
  pottery: item => `${getResponseValue('stratigraphicUnit.site.code', item)}.${twoDigitYear(item.stratigraphicUnit)}.${paddedSUNumber(item)}.P.${item.number}`
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
