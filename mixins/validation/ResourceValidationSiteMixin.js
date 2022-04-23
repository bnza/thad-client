import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    modelItem: {
      code: { required,  maxLength: maxLength(3), minLength: minLength(2)},
      name: { required },
    },
  },
  computed: {
    codeErrors() {
      const errors = []
      if (!this.$v.modelItem.code.$dirty) return errors
      !this.$v.modelItem.code.maxLength && errors.push('Must be less than 3 characters ')
      !this.$v.modelItem.code.minLength && errors.push('Must be more than 2 characters ')
      !this.$v.modelItem.code.required && errors.push('Code is required')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.modelItem.name.$dirty) return errors
      !this.$v.modelItem.name.required && errors.push('Name is required.')
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
