import {has, isEmpty} from "ramda";
import {mapGetters} from "vuex";

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
const twoDigitYear = year => `${year}`.substring(2,4)
const paddedSUNumber = number => number.toString().padStart(5,'0')
const itemBaseCode = (item, infix) =>  `${getResponseValue('stratigraphicUnit.site.code', item)}.${twoDigitYear(getResponseValue('stratigraphicUnit.year', item))}.${paddedSUNumber(getResponseValue('stratigraphicUnit.number', item))}.${infix}`
const itemNumberedCode = (item, infix) => `${itemBaseCode(item, infix)}.${item.number}`
const codeFormatters = {
  site: item => item.code || '',
  area: item => getResponseValue('area.code', item)
    ? `${getResponseValue('site.code', item)}.${getResponseValue('area.code', item)}`
    : `${getResponseValue('site.code', item)}.${getResponseValue('code', item)}`,
  smallFind: item => itemNumberedCode(item, 'O'),
  stratigraphicUnit: item => `${getResponseValue('site.code', item)}.${twoDigitYear(item.year)}.SU.${paddedSUNumber(item.number)}`,
  pottery: item => itemNumberedCode(item, 'P'),
  ecofact: item => itemNumberedCode(item, 'E'),
  sample: item => itemNumberedCode(item, 'S'),
  cumulativePotterySheet: item => itemBaseCode(item, 'CP'),
  grave: item => `${getResponseValue('site.code', item)}.${twoDigitYear(item.year)}.G.${paddedSUNumber(item.number)}`,
  document: item => `${getResponseValue('site.code', item)}.${twoDigitYear(item.year)}.D.${paddedSUNumber(item.number)}`,
}

export default {
  computed: {
    ...mapGetters('vocabularies', ['getVocabular']),
    ready() {
      return !isEmpty(this.responseData)
    },
  },
  methods: {
    getVocabularValue(vocabularyName, id, value = 'value') {
      return this.getResponseValue(
        value,
        this.getVocabular(vocabularyName, id)
      )
    },
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
      if (!item) {
        return ''
      }
      if (has(resourceName, codeFormatters)) {
        return codeFormatters[resourceName](item)
      }
    },
  },
}
