import { validationMixin } from 'vuelidate'
import {required, integer, between} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    modelItem: {
      area: { required },
      number: { required, integer },
      year: { required, integer, between: between(2000, 2099)},
      type: { required },
      mediaObject: { required },
      description: { required },
      interpretation: { required },
      creator: { required }
    },
  },
  computed: {
    areaErrors() {
      const errors = []
      if (!this.$v.modelItem.area.$dirty) return errors
      !this.$v.modelItem.area.required && errors.push('area is required.')
      return errors
    },
    typeErrors() {
      const errors = []
      if (!this.$v.modelItem.type.$dirty) return errors
      !this.$v.modelItem.type.required && errors.push('Document type is required.')
      return errors
    },
    mediaObjectErrors() {
      const errors = []
      if (!this.$v.modelItem.mediaObject.$dirty) return errors
      !this.$v.modelItem.mediaObject.required && errors.push('Media is required.')
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.modelItem.description.$dirty) return errors
      !this.$v.modelItem.description.required && errors.push('Description is required.')
      return errors
    },
    interpretationErrors() {
      const errors = []
      if (!this.$v.modelItem.interpretation.$dirty) return errors
      !this.$v.modelItem.interpretation.required && errors.push('Interpretation is required.')
      return errors
    },
    creatorErrors() {
      const errors = []
      if (!this.$v.modelItem.creator.$dirty) return errors
      !this.$v.modelItem.creator.required && errors.push('Creator is required.')
      return errors
    },
    numberErrors() {
      const errors = []
      if (!this.$v.modelItem.number.$dirty) return errors
      !this.$v.modelItem.number.required && errors.push('Document number is required.')
      !this.$v.modelItem.number.integer && errors.push('Document number must be an integer number.')
      return errors
    },
    yearErrors() {
      const errors = []
      if (!this.$v.modelItem.year.$dirty) return errors
      !this.$v.modelItem.year.required && errors.push('Document creation year is required.')
      !this.$v.modelItem.year.integer && errors.push('Document creation year must be an integer number.')
      !this.$v.modelItem.year.between && errors.push('Document creation year must be between 2000 and 2099')
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
