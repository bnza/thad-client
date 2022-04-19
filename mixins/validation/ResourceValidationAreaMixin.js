import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    item: {
      site: { required },
      code: { required,  maxLength: maxLength(3)},
      name: { required },
    },
  },
  computed: {
    siteErrors() {
      const errors = []
      if (!this.$v.item.site.$dirty) return errors
      !this.$v.item.site.required && errors.push('Site is required.')
      return errors
    },
    codeErrors() {
      const errors = []
      if (!this.$v.item.code.$dirty) return errors
      !this.$v.item.code.maxLength && errors.push('Must be less than 3 characters ')
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
