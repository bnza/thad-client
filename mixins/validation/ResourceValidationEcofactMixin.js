import { validationMixin } from 'vuelidate'
import { required, integer, decimal } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    modelItem: {
      stratigraphicUnit: { required },
      number: { required, integer },
      type: {required },
      quantity: { integer },
      length: { decimal },
      height: { decimal },
      width: { decimal },
      thickness: { decimal },
      minDiameter: { decimal },
      maxDiameter: { decimal },
      weight: {decimal}
    },
  },
  computed: {
    stratigraphicUnitErrors() {
      const errors = []
      if (!this.$v.modelItem.stratigraphicUnit.$dirty) return errors
      !this.$v.modelItem.stratigraphicUnit.required && errors.push('SU is required.')
      return errors
    },
    typeErrors() {
      const errors = []
      if (!this.$v.modelItem.type.$dirty) return errors
      !this.$v.modelItem.type.required && errors.push('type is required.')
      return errors
    },
    numberErrors() {
      const errors = []
      if (!this.$v.modelItem.number.$dirty) return errors
      !this.$v.modelItem.number.required && errors.push('Ecofact number is required.')
      !this.$v.modelItem.number.integer && errors.push('Ecofact number must be an integer number.')
      return errors
    },
    quantityErrors() {
      const errors = []
      if (!this.$v.modelItem.quantity.$dirty) return errors
      !this.$v.modelItem.quantity.integer && errors.push('Quantity number must be an integer number.')
      return errors
    },
    lengthErrors() {
      const errors = []
      if (!this.$v.modelItem.length.$dirty) return errors
      !this.$v.modelItem.length.decimal && errors.push('Length must be a decimal number.')
      return errors
    },
    heightErrors() {
      const errors = []
      if (!this.$v.modelItem.height.$dirty) return errors
      !this.$v.modelItem.height.decimal && errors.push('Height must be a decimal number.')
      return errors
    },
    widthErrors() {
      const errors = []
      if (!this.$v.modelItem.width.$dirty) return errors
      !this.$v.modelItem.width.decimal && errors.push('Width must be a decimal number.')
      return errors
    },
    thicknessErrors() {
      const errors = []
      if (!this.$v.modelItem.thickness.$dirty) return errors
      !this.$v.modelItem.thickness.decimal && errors.push('Thickness must be a decimal number.')
      return errors
    },
    maxDiameterErrors() {
      const errors = []
      if (!this.$v.modelItem.maxDiameter.$dirty) return errors
      !this.$v.modelItem.maxDiameter.decimal && errors.push('Max diameter must be a decimal number.')
      return errors
    },
    minDiameterErrors() {
      const errors = []
      if (!this.$v.modelItem.minDiameter.$dirty) return errors
      !this.$v.modelItem.minDiameter.decimal && errors.push('Min diameter must be a decimal number.')
      return errors
    },
    weightErrors() {
      const errors = []
      if (!this.$v.modelItem.weight.$dirty) return errors
      !this.$v.modelItem.weight.decimal && errors.push('Weight must be a decimal number.')
      return errors
    },

  },
  watch: {
    modelItem: {
      handler(item) {
        if (item.code) {
          this.modelItem.code = item.code.trim().toUpperCase()
        }
        if (item.name) {
          this.modelItem.name = item.name.trim()
        }
      },
      deep: true
    }
  },
}
