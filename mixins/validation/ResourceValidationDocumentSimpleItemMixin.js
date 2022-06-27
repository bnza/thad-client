import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
const uniqueValue = (value, vm) => !vm.items.includes(value)
export default {
  mixins: [validationMixin],
  validations: {
    createdItem: { required, uniqueValue },
  },
  computed: {
    itemErrors() {
      const errors = []
      if (!this.$v.createdItem.$dirty) return errors
      !this.$v.createdItem.required && errors.push('Value is required.')
      !this.$v.createdItem.uniqueValue && errors.push('Duplicate value.')
      return errors
    },
  }
}
