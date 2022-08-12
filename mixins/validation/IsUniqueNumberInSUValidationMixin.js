export default {
  data() {
    return {
      validatingValuesChanged: {
        number: false,
        stratigraphicUnit: false
      }
    }
  },
  watch: {
    'modelItem.number'(value, old) {
      this.validatingValuesChanged.number = value !== old
    },
    'modelItem.stratigraphicUnit'(value, old) {
      this.validatingValuesChanged.stratigraphicUnit = value !== old
    }
  },
}
