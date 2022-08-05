import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import relationshipIsNotSelfReferencing from "~/src/validators/relationshipIsNotSelfReferencing";

export default {
  mixins: [validationMixin],
  validations: {
    requestData: {
      sxSU: { required },
      relationship: { required },
      dxSU: {
        required,
        isNotSelfReferencing: relationshipIsNotSelfReferencing()
      },
    },
  },
  computed: {
    sxSUErrors() {
      const errors = []
      if (!this.$v.requestData.sxSU.$dirty) return errors
      !this.$v.requestData.sxSU.required && errors.push('SU is required')
      return errors
    },
    relationshipErrors() {
      const errors = []
      if (!this.$v.requestData.relationship.$dirty) return errors
      !this.$v.requestData.relationship.required && errors.push('Relationship is required')
      return errors
    },
    dxSUErrors() {
      const errors = []
      if (!this.$v.requestData.dxSU.$dirty) return errors
      !this.$v.requestData.dxSU.required && errors.push('Related SU is required.')
      !this.$v.requestData.dxSU.isNotSelfReferencing && errors.push('Stratigraphic relationship/sequence should not self referencing.')
      return errors
    },
  }
}
