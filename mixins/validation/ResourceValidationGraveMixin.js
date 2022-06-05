import { validationMixin } from 'vuelidate'
import { required, integer, between } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    modelItem: {
      area: { required },
      number: { required, integer },
      type: { required },
      year: { required, integer, between: between(2000, 2099)},
    },
  },
  computed: {
    areaErrors() {
      const errors = []
      if (!this.$v.modelItem.area.$dirty) return errors
      !this.$v.modelItem.area.required && errors.push('Area is required.')
      return errors
    },
    numberErrors() {
      const errors = []
      if (!this.$v.modelItem.number.$dirty) return errors
      !this.$v.modelItem.number.required && errors.push('Grave number is required.')
      !this.$v.modelItem.number.integer && errors.push('Grave number must be an integer number.')
      return errors
    },
    yearErrors() {
      const errors = []
      if (!this.$v.modelItem.year.$dirty) return errors
      !this.$v.modelItem.year.required && errors.push('Grave excavation year is required.')
      !this.$v.modelItem.year.integer && errors.push('Grave excavation year must be an integer number.')
      !this.$v.modelItem.year.between && errors.push('Grave must be between 2000 and 2099')
      return errors
    },
    typeErrors() {
      const errors = []
      if (!this.$v.modelItem.type.$dirty) return errors
      !this.$v.modelItem.type.required && errors.push('Grave type is required.')
      return errors
    },
  }
}
