import { validationMixin } from 'vuelidate'
import { required, integer } from 'vuelidate/lib/validators'
import uniqueValueInArray from "~/src/validators/uniqueValueInArray";

export default {
  mixins: [validationMixin],
  validations: {
    createdItem: { required, integer, uniqueValue: uniqueValueInArray('items') },
  },
  computed: {
    itemErrors() {
      const errors = []
      if (!this.$v.createdItem.$dirty) return errors
      !this.$v.createdItem.required && errors.push('Value is required.')
      !this.$v.createdItem.uniqueValue && errors.push('Duplicate value.')
      !this.$v.createdItem.integer && errors.push('Value must be an integer.')
      return errors
    },
  }
}
