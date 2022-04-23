import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    modelItem: {
      site: { required },
      code: { required,  maxLength: maxLength(3)},
      name: { required },
    },
  },
  computed: {
    siteErrors() {
      const errors = []
      if (!this.$v.modelItem.site.$dirty) return errors
      !this.$v.modelItem.site.required && errors.push('Site is required.')
      return errors
    },
    codeErrors() {
      const errors = []
      if (!this.$v.modelItem.code.$dirty) return errors
      !this.$v.modelItem.code.maxLength && errors.push('Must be less than 3 characters ')
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
