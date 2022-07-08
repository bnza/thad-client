import { validationMixin } from 'vuelidate'
import { required, helpers, maxLength } from 'vuelidate/lib/validators'
import uniqueValueInArray from "~/src/validators/uniqueValueInArray";

export default {
  mixins: [validationMixin],
  validations: {
    createdItem: {
      required,
      uniqueValue: uniqueValueInArray('items'),
      maxLength: maxLength(2),
      uppercase: helpers.regex('isUppercase',/^[A-Z]*$/)
    },
  },
  computed: {
    itemErrors() {
      const errors = []
      if (!this.$v.createdItem.$dirty) return errors
      !this.$v.createdItem.required && errors.push('Value is required.')
      !this.$v.createdItem.uniqueValue && errors.push('Duplicate value.')
      !this.$v.createdItem.uppercase && errors.push('Value must uppercase.')
      !this.$v.createdItem.maxLength && errors.push('Value must be less than 4 characters.')
      return errors
    },
  }
}
