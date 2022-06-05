import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    target: {required}
  },
  computed: {
    targetErrors() {
      const errors = []
      if (!this.$v.target.$dirty) return errors
      !this.$v.target.required && errors.push('SU is required.')
      return errors
    },
  },
}
