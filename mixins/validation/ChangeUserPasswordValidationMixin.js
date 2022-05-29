import { validationMixin } from 'vuelidate'
import { required, sameAs } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    modelItem: {
      oldPassword: { required },
      newPassword: { required },
      repeatPassword: { sameAsPassword: sameAs('newPassword') },
    },
  },
  computed: {
    repeatPasswordErrors() {
      const errors = []
      if (!this.$v.modelItem.repeatPassword.$dirty) return errors
      !this.$v.modelItem.repeatPassword.sameAsPassword && errors.push('Passwords do not match')
      return errors
    },
    newPasswordErrors() {
      const errors = []
      if (!this.$v.modelItem.newPassword.$dirty) return errors
      !this.$v.modelItem.newPassword.required && errors.push('New password is required.')
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
