import { validationMixin } from 'vuelidate'
import { required, sameAs, helpers, minLength } from 'vuelidate/lib/validators'

const containsDigit = helpers.regex('containsDigit',/\d/)
const containsUpperCase = helpers.regex('containsUpperCase',/[A-Z]/)
const containsLowerCase = helpers.regex('containsLowerCase',/[a-z]/)
const containsNotAlphanumeric = helpers.regex('containsNotAlphanumeric',/\W/)

export default {
  mixins: [validationMixin],
  validations: {
    modelItem: {
      oldPassword: { required },
      password: { required, minLength: minLength(8), containsDigit, containsUpperCase, containsLowerCase, containsNotAlphanumeric },
      repeatPassword: { sameAsPassword: sameAs('password') },
    },
  },
  computed: {
    repeatPasswordErrors() {
      const errors = []
      if (!this.$v.modelItem.repeatPassword.$dirty) return errors
      !this.$v.modelItem.repeatPassword.sameAsPassword && errors.push('Passwords do not match')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.modelItem.password.$dirty) return errors
      !this.$v.modelItem.password.required && errors.push('New password is required.')
      !this.$v.modelItem.password.minLength && errors.push('New password must be at least 8 character long.')
      !this.$v.modelItem.password.containsDigit && errors.push('New password must contains at least a digit.')
      !this.$v.modelItem.password.containsUpperCase && errors.push('New password must contains at least an uppercase character.')
      !this.$v.modelItem.password.containsLowerCase && errors.push('New password must contains at least a lowercase character.')
      !this.$v.modelItem.password.containsNotAlphanumeric && errors.push('New password must contains at least one not alphanumeric character (e.g. #@()-).')
      return errors
    },
    oldPasswordErrors() {
      const errors = []
      if (!this.$v.modelItem.oldPassword.$dirty) return errors
      !this.$v.modelItem.oldPassword.required && errors.push('Old password is required.')
      return errors
    },
  },
}
