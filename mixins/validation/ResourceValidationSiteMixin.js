import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    editableItem: {
      code: { required,  maxLength: maxLength(3), minLength: minLength(2)},
      name: { required },
    },
  },
  computed: {
    codeErrors() {
      const errors = []
      if (!this.$v.editableItem.code.$dirty) return errors
      !this.$v.editableItem.code.maxLength && errors.push('Must be less than 3 characters ')
      !this.$v.editableItem.code.minLength && errors.push('Must be more than 2 characters ')
      !this.$v.editableItem.code.required && errors.push('Code is required')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.editableItem.name.$dirty) return errors
      !this.$v.editableItem.name.required && errors.push('Name is required.')
      return errors
    },
  },
  watch: {
    editableItem: {
      handler(item) {
        if (item.code) {
          this.editableItem.code = item.code.trim().toUpperCase()
        }
        if (item.name) {
          this.editableItem.name = item.name.trim()
        }
      },
      deep: true
    }
  },
}
