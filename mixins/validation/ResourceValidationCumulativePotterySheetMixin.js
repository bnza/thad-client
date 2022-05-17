import { validationMixin } from 'vuelidate'
import { fromPairs, mergeLeft } from "ramda";
import { required, integer, minValue } from 'vuelidate/lib/validators'
import {CUMULATIVE_POTTERY_SHEET_NUMERIC_FIELDS} from "~/src/constants";

export const countFields = CUMULATIVE_POTTERY_SHEET_NUMERIC_FIELDS

export default {
  mixins: [validationMixin],
  data() {
    return {
      validationErrors: {}
    }
  },
  validations() {
    const localRules = {
        stratigraphicUnit: {required},
        number: {required, integer, minValue: minValue(0)}
    }
    return {
      modelItem: mergeLeft(fromPairs(countFields.map(field => [field, {integer, minValue: minValue(0)}])), localRules)
    }
  },
  computed: {
    stratigraphicUnitErrors() {
      const errors = []
      if (!this.$v.modelItem.stratigraphicUnit.$dirty) return errors
      !this.$v.modelItem.stratigraphicUnit.required && errors.push('SU is required.')
      return errors
    },
    numberErrors() {
      const errors = []
      if (!this.$v.modelItem.number.$dirty) return errors
      !this.$v.modelItem.number.required && errors.push('Ecofact number is required.')
      !this.$v.modelItem.number.integer && errors.push('Ecofact number must be an integer number.')
      !this.$v.modelItem.number.minValue && errors.push('Ecofact number must be a positive number.')
      return errors
    },
    errors() {
      const vm = this
      return function (field) {
        const errors = []
        if (!vm.$v.modelItem[field].$dirty) return errors
        !vm.$v.modelItem[field].integer && errors.push('Value must be an integer number.')
        !vm.$v.modelItem[field].minValue && errors.push('Value must be a positive number.')
        return errors
      }
    },
  },
/*   methods: {
    debounceInput: debounce(function (field, e) {
      this.$v.modelItem[field].$touch()
      this.modelItem[field] = e.target.value
    }, 500)
  }, */
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
