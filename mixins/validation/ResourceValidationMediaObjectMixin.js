import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    modelItem: {
      file: {required}
    },
  },
  computed: {
    fileErrors() {
      const errors = []
      if (!this.$v.modelItem.file.$dirty) return errors
      !this.$v.modelItem.file.required && errors.push('file is required.')
      return errors
    },
  },
}
