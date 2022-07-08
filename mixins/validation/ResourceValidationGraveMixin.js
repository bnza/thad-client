import { validationMixin } from 'vuelidate'
import {required, integer, between, maxLength, helpers} from 'vuelidate/lib/validators'

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
      !this.$v.modelItem.number.required && errors.push('Grave number is required.')
      !this.$v.modelItem.number.integer && errors.push('Grave number must be an integer number.')
      return errors
    },
    yearErrors() {
      const errors = []
      if (!this.$v.modelItem.year.$dirty) return errors
      !this.$v.modelItem.year.required && errors.push('Grave excavation year is required.')
      !this.$v.modelItem.year.integer && errors.push('Grave excavation year must be an integer number.')
      !this.$v.modelItem.year.between && errors.push('Grave must be between 2000 and 2099')
      return errors
    },
    typeErrors() {
      const errors = []
      if (!this.$v.modelItem.type.$dirty) return errors
      !this.$v.modelItem.type.required && errors.push('Grave type is required.')
      return errors
    },
    buildingErrors() {
      const errors = []
      if (!this.$v.modelItem.building.$dirty) return errors
      !this.$v.modelItem.building.integer && errors.push('Building identifier must be an integer number')
      return errors
    },
    buildingPhaseErrors() {
      const errors = []
      if (!this.$v.modelItem.buildingPhase.$dirty) return errors
      !this.$v.modelItem.buildingPhase.integer && errors.push('Building phase identifier must be an integer number')
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
  }
}
