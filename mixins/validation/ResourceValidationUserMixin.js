import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    modelItem: {
      email: { required,  email},
      roles: { required },
    },
  },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.modelItem.email.$dirty) return errors
      !this.$v.modelItem.email.email && errors.push('Username must be a valid e-mail')
      !this.$v.modelItem.email.required && errors.push('Username is required')
      return errors
    },
    rolesErrors() {
      const errors = []
      if (!this.$v.modelItem.roles.$dirty) return errors
      !this.$v.modelItem.roles.required && errors.push('Roles is required.')
      return errors
    },
  },
}
