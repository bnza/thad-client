import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    target: {
      id: {required}
    }
  },
  computed: {
    targetErrors() {
      const errors = []
      if (!this.$v.target.id.$dirty) return errors
      !this.$v.target.id.required && errors.push('Value is required.')
      return errors
    },
  },
}
