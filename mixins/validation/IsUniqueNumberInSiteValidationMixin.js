export default {
  data() {
    return {
      validatingValuesChanged: {
        number: false,
        site: false
      }
    }
  },
  watch: {
    'modelItem.number'(value, old) {
      this.validatingValuesChanged.number = value !== old
    },
    'modelItem.site'(value, old) {
      this.validatingValuesChanged.site = value !== old
    }
  },
}
