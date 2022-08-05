import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    requestData: {
      mediaObject: { required },
      stratigraphicUnit: { required },
    },
  },
  computed: {
    mediaObjectErrors() {
      const errors = []
      if (!this.$v.requestData.mediaObject.$dirty) return errors
      !this.$v.requestData.mediaObject.required && errors.push('mediaObject is required')
      return errors
    },
    stratigraphicUnitErrors() {
      const errors = []
      if (!this.$v.requestData.stratigraphicUnit.$dirty) return errors
      !this.$v.requestData.stratigraphicUnit.required && errors.push('SU is required.')
      return errors
    },
  }
}
