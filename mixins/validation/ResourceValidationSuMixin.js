import { validationMixin } from 'vuelidate'
import { required, integer, helpers, between, maxLength } from 'vuelidate/lib/validators'
import {optionalDecimal} from "~/src/validator";
import greaterThan from "~/src/validators/greaterThan";

export default {
  mixins: [validationMixin],
  validations: {
    modelItem: {
      area: { required },
      number: { required, integer },
      type: { required },
      year: { required, integer, between: between(2000, 2099)},
      building: { integer },
      buildingPhase: { integer },
      room: {maxLength: maxLength(3), lowercase: helpers.regex('isLowercase',/^[a-z]*$/)},
      phase: { integer },
      subPhase: { integer },
      topElevation: { optionalDecimal, optionalGreaterThan: greaterThan('bottomElevation')},
      bottomElevation: { optionalDecimal }
    },
  },
  computed: {
    areaErrors() {
      const errors = []
      if (!this.$v.modelItem.area.$dirty) return errors
      !this.$v.modelItem.area.required && errors.push('Area is required.')
      return errors
    },
    numberErrors() {
      const errors = []
      if (!this.$v.modelItem.number.$dirty) return errors
      !this.$v.modelItem.number.required && errors.push('SU number is required.')
      !this.$v.modelItem.number.integer && errors.push('SU number must be an integer number.')
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
      !this.$v.modelItem.room.maxLength && errors.push('Room identifier must be less than 4 characters')
      !this.$v.modelItem.room.lowercase && errors.push('Room identifier must be lowercase alphabetic character')
      return errors
    },
    phaseErrors() {
      const errors = []
      if (!this.$v.modelItem.phase.$dirty) return errors
      !this.$v.modelItem.phase.integer && errors.push('Phase identifier must be an integer number')
      return errors
    },
    subPhaseErrors() {
      const errors = []
      if (!this.$v.modelItem.subPhase.$dirty) return errors
      !this.$v.modelItem.subPhase.integer && errors.push('Sub phase identifier must be an integer number')
      return errors
    },
    buildingPhaseErrors() {
      const errors = []
      if (!this.$v.modelItem.buildingPhase.$dirty) return errors
      !this.$v.modelItem.buildingPhase.integer && errors.push('Building phase identifier must be an integer number')
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
