import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import fileSizeLessThan from "~/src/validators/fileSizeLessThan";

export default {
  mixins: [validationMixin],
  validations: {
    modelItem: {
      file: {
        required,
        fileSizeLessThan: fileSizeLessThan(10)
      }
    },
  },
  computed: {
    fileErrors() {
      const errors = []
      if (!this.$v.modelItem.file.$dirty) return errors
      !this.$v.modelItem.file.required && errors.push('file is required.')
      !this.$v.modelItem.file.fileSizeLessThan && errors.push('file size must be less than 10M.')
      return errors
    },
  },
}
