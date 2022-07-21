import { validationMixin } from 'vuelidate'
import { required, helpers, maxLength, integer, minValue } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    modelItem: {
      building: {
        required,
        integer,
        minValue: minValue(1)
      },
      room: {
        maxLength: maxLength(2),
        uppercase: helpers.regex('isUppercase',/^[A-Z]*$/)
      }
    },
  },
  computed: {
    buildingErrors() {
      const errors = []
      if (!this.$v.modelItem.building.$dirty) return errors
      !this.$v.modelItem.building.required && errors.push('Value is required.')
      !this.$v.modelItem.building.integer && errors.push('Value must be an integer.')
      !this.$v.modelItem.building.integer && errors.push('Value must be greater than zero.')
      return errors
    },
    roomErrors() {
      const errors = []
      if (!this.$v.modelItem.room.$dirty) return errors
      !this.$v.modelItem.room.uppercase && errors.push('Value must uppercase.')
      !this.$v.modelItem.room.maxLength && errors.push('Value must be less than 4 characters.')
      return errors
    },
  }
}
