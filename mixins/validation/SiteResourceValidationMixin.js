import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    item: {
      code: { required,  maxLength: maxLength(3), minLength: minLength(2)},
      name: { required },
    },
  },
  computed: {
    codeErrors() {
      const errors = []
      if (!this.$v.item.code.$dirty) return errors
      !this.$v.item.code.maxLength && errors.push('Must be less than 3 characters ')
      !this.$v.item.code.minLength && errors.push('Must be more than 2 characters ')
      !this.$v.item.code.required && errors.push('Code is required')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.item.name.$dirty) return errors
      !this.$v.item.name.required && errors.push('Name is required.')
      return errors
    },
  },
}
