import {has, isEmpty} from "ramda";

export default {
  computed: {
    ready() {
      return !isEmpty(this.responseData)
    },
  },
  methods: {
    getResponseValue(key, item) {
      item = item || this.responseData
      if (isEmpty(item)) {
        return
      }
      return key.split('.').reduce((obj, key) => {
        if (obj && has(key, obj)) {
          return obj[key]
        }
        return undefined
      }, item)
    },
    getResponseDateString(key) {
      const date = this.getResponseValue(key)
      if (!date) {
        return date
      }
      return (new Date(date)).toLocaleDateString()
    }
  },
}
