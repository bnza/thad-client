import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    requestData: {
      mediaObject: { required },
      grave: { required },
    },
  },
  computed: {
    mediaObjectErrors() {
      const errors = []
      if (!this.$v.requestData.mediaObject.$dirty) return errors
      !this.$v.requestData.mediaObject.required && errors.push('mediaObject is required')
      return errors
    },
    graveErrors() {
      const errors = []
      if (!this.$v.requestData.grave.$dirty) return errors
      !this.$v.requestData.grave.required && errors.push('Grave is required.')
      return errors
    },
  }
}
