import { validationMixin } from 'vuelidate'
import { required, integer, helpers, between, maxLength, minValue } from 'vuelidate/lib/validators'
import {optionalDecimal} from "~/src/validator";
import greaterThan from "~/src/validators/greaterThan";
import isUniqueNumberInSite from "~/src/validators/isUniqueNumberInSite";
import IsUniqueNumberInSiteValidationMixin from "~/mixins/validation/IsUniqueNumberInSiteValidationMixin";

export default {
  mixins: [
    validationMixin,
    IsUniqueNumberInSiteValidationMixin
  ],
  validations() {
    return {
      modelItem: {
        area: {required},
        number: {
          required,
          integer,
          isUniqueNumberInSite:
            isUniqueNumberInSite(
              this.isUniqueNumberInSite,
              this.resourceName,
              this.requestData,
              this.validatingValuesChanged
            ),
          positive: minValue(1)
        },
        type: {required},
        year: {required, integer, between: between(2000, 2099)},
        building: {integer},
        buildingSubPhase: {lowercase: helpers.regex('isLowercase', /^[a-z]*$/), maxLength: maxLength(1)},
        room: {maxLength: maxLength(3), uppercase: helpers.regex('isUppercase', /^[A-Z]*$/)},
        phase: {integer},
        subPhase: {lowercase: helpers.regex('isLowercase', /^[a-z]*$/), maxLength: maxLength(1)},
        topElevation: {optionalDecimal, optionalGreaterThan: greaterThan('bottomElevation')},
        bottomElevation: {optionalDecimal},
        compiler: {required},
      }
   }
  },
  computed: {
    areaErrors() {
      const errors = []
      if (!this.$v.modelItem.area.$dirty) return errors
      !this.$v.modelItem.area.required && errors.push('Area is required.')
      return errors
    },
    compilerErrors() {
      const errors = []
      if (!this.$v.modelItem.compiler.$dirty) return errors
      !this.$v.modelItem.compiler.required && errors.push('Compiler is required.')
      return errors
    },
    numberErrors() {
      const errors = []
      if (!this.$v.modelItem.number.$dirty) return errors
      !this.$v.modelItem.number.required && errors.push('SU number is required.')
      !this.$v.modelItem.number.integer && errors.push('SU number must be an integer number.')
      !this.$v.modelItem.number.positive && errors.push('SU number must be positive value.')
      !this.$v.modelItem.number.isUniqueNumberInSite && errors.push('Duplicate SU number for this site.')
      return errors
    },
    yearErrors() {
      const errors = []
      if (!this.$v.modelItem.year.$dirty) return errors
      !this.$v.modelItem.year.required && errors.push('SU excavation year is required.')
      !this.$v.modelItem.year.integer && errors.push('SU excavation year must be an integer number.')
      !this.$v.modelItem.year.between && errors.push('SU must be between 2000 and 2099')
      return errors
    },
    typeErrors() {
      const errors = []
      if (!this.$v.modelItem.type.$dirty) return errors
      !this.$v.modelItem.type.required && errors.push('SU type is required.')
      return errors
    },
    bottomElevationErrors() {
      const errors = []
      if (!this.$v.modelItem.bottomElevation.$dirty) return errors
      !this.$v.modelItem.bottomElevation.optionalDecimal && errors.push('Elevation must be decimal.')
      return errors
    },
    topElevationErrors() {
      const errors = []
      if (!this.$v.modelItem.topElevation.$dirty) return errors
      !this.$v.modelItem.topElevation.optionalDecimal && errors.push('Elevation must be decimal.')
      !this.$v.modelItem.topElevation.optionalGreaterThan && errors.push('Top elevation must be greater than bottom elevation.')
      return errors
    },
    buildingErrors() {
      const errors = []
      if (!this.$v.modelItem.building.$dirty) return errors
      !this.$v.modelItem.building.integer && errors.push('Room identifier must be an integer number')
      return errors
    },
    roomErrors() {
      const errors = []
      if (!this.$v.modelItem.room.$dirty) return errors
      !this.$v.modelItem.room.maxLength && errors.push('Room identifier must be less than 3 characters')
      !this.$v.modelItem.room.uppercase && errors.push('Room identifier must be a uppercase alphabetic character')
      return errors
    },
    phaseErrors() {
      const errors = []
      if (!this.$v.modelItem.phase.$dirty) return errors
      !this.$v.modelItem.room.maxLength && errors.push('Phase identifier must be a single character')
      !this.$v.modelItem.phase.integer && errors.push('Phase identifier must be a lowercase alphabetic character')
      return errors
    },
    subPhaseErrors() {
      const errors = []
      if (!this.$v.modelItem.subPhase.$dirty) return errors
      !this.$v.modelItem.subPhase.maxLength && errors.push('Sub phase identifier must be a single character')
      !this.$v.modelItem.subPhase.lowercase && errors.push('Sub phase identifier must be an lowercase number')
      return errors
    },
    buildingSubPhaseErrors() {
      const errors = []
      if (!this.$v.modelItem.buildingSubPhase.$dirty) return errors
      !this.$v.modelItem.buildingSubPhase.maxLength && errors.push('Building sub phase identifier must be a single character')
      !this.$v.modelItem.buildingSubPhase.lowercase && errors.push('Building sub phase identifier must be a lowercase alphabetic character')
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
