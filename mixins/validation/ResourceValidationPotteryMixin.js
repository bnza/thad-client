import { validationMixin } from 'vuelidate'
import { required, integer, decimal, minValue } from 'vuelidate/lib/validators'
import isValidSubPeriod from "~/src/validators/isValidSubPeriod";
import IsUniqueNumberInSUValidationMixin from "~/mixins/validation/IsUniqueNumberInSUValidationMixin";
import isUniqueNumberInSU from "~/src/validators/isUniqueNumberInSU";

export default {
  mixins: [
    validationMixin,
    IsUniqueNumberInSUValidationMixin
  ],
  validations() {
    return  {
      modelItem: {
        stratigraphicUnit: {required},
        number: {
          required,
          integer,
          isUniqueNumberInSU: isUniqueNumberInSU(
            this.isUniqueNumberInSU,
            this.resourceName,
            this.requestData,
            this.validatingValuesChanged
          ),
          positive: minValue(1)
        },
        thickness: {decimal},
        rimDiameter: {decimal},
        baseDiameter: {decimal},
        compiler: {required},
        subperiod: {isValidSubPeriod: isValidSubPeriod()}
      }
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
      !this.$v.modelItem.number.required && errors.push('Pottery number is required.')
      !this.$v.modelItem.number.integer && errors.push('Pottery number must be an integer number.')
      !this.$v.modelItem.number.positive && errors.push('SU number must be positive value.')
      !this.$v.modelItem.number.isUniqueNumberInSU && errors.push('Duplicate pottery number for this SU.')
      return errors
    },
    thicknessErrors() {
      const errors = []
      if (!this.$v.modelItem.thickness.$dirty) return errors
      !this.$v.modelItem.thickness.decimal && errors.push('Thickness must be a decimal number.')
      return errors
    },
    rimDiameterErrors() {
      const errors = []
      if (!this.$v.modelItem.rimDiameter.$dirty) return errors
      !this.$v.modelItem.rimDiameter.decimal && errors.push('Rim diameter must be a decimal number.')
      return errors
    },
    baseDiameterErrors() {
      const errors = []
      if (!this.$v.modelItem.baseDiameter.$dirty) return errors
      !this.$v.modelItem.baseDiameter.decimal && errors.push('Base diameter must be a decimal number.')
      return errors
    },
    compilerErrors() {
      const errors = []
      if (!this.$v.modelItem.compiler.$dirty) return errors
      !this.$v.modelItem.compiler.required && errors.push('Compiler is required.')
      return errors
    },
    subperiodErrors() {
      const errors = []
      if (!this.$v.modelItem.subperiod.$dirty) return errors
      !this.$v.modelItem.subperiod.isValidSubPeriod && errors.push('Period/subperiod mismatch.')
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
