import { validationMixin } from 'vuelidate'
import { required, integer, decimal, between, minValue } from 'vuelidate/lib/validators'
import greaterThan from "~/src/validators/greaterThan";
import coordinateIsATriple from "~/src/validators/coordinateIsATriple";
import isValidSubPeriod from "~/src/validators/isValidSubPeriod";
import IsUniqueNumberInSUValidationMixin from "~/mixins/validation/IsUniqueNumberInSUValidationMixin";
import isUniqueNumberInSU from "~/src/validators/isUniqueNumberInSU";

export default {
  mixins: [
    validationMixin,
    IsUniqueNumberInSUValidationMixin
  ],
  validations() {
    return {
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
        type: {required},
        material: {required},
        preservation: {required},
        length: {decimal},
        height: {decimal},
        width: {decimal},
        minWidth: {decimal},
        maxWidth: {decimal, greaterThan: greaterThan('minWidth')},
        thickness: {decimal},
        baseDiameter: {decimal},
        minDiameter: {decimal},
        coordN: {decimal, coordinateIsATriple: coordinateIsATriple(), between: between(0.00, 9329005.18)},
        coordE: {decimal, coordinateIsATriple: coordinateIsATriple(), between: between(166021.44, 833978.56)},
        coordZ: {decimal, coordinateIsATriple: coordinateIsATriple()},
        maxDiameter: {decimal, greaterThan: greaterThan('minDiameter')},
        weight: {decimal},
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
    typeErrors() {
      const errors = []
      if (!this.$v.modelItem.type.$dirty) return errors
      !this.$v.modelItem.type.required && errors.push('type is required.')
      return errors
    },
    materialErrors() {
      const errors = []
      if (!this.$v.modelItem.material.$dirty) return errors
      !this.$v.modelItem.material.required && errors.push('material is required.')
      return errors
    },
    preservationErrors() {
      const errors = []
      if (!this.$v.modelItem.preservation.$dirty) return errors
      !this.$v.modelItem.preservation.required && errors.push('preservation is required.')
      return errors
    },
    numberErrors() {
      const errors = []
      if (!this.$v.modelItem.number.$dirty) return errors
      !this.$v.modelItem.number.required && errors.push('Ecofact number is required.')
      !this.$v.modelItem.number.integer && errors.push('Ecofact number must be an integer number.')
      !this.$v.modelItem.number.positive && errors.push('SU number must be positive value.')
      !this.$v.modelItem.number.isUniqueNumberInSU && errors.push('Duplicate small find number for this SU.')
      return errors
    },
    lengthErrors() {
      const errors = []
      if (!this.$v.modelItem.length.$dirty) return errors
      !this.$v.modelItem.length.decimal && errors.push('Length must be a decimal number.')
      return errors
    },
    heightErrors() {
      const errors = []
      if (!this.$v.modelItem.height.$dirty) return errors
      !this.$v.modelItem.height.decimal && errors.push('Height must be a decimal number.')
      return errors
    },
    widthErrors() {
      const errors = []
      if (!this.$v.modelItem.width.$dirty) return errors
      !this.$v.modelItem.width.decimal && errors.push('Width must be a decimal number.')
      return errors
    },
    minWidthErrors() {
      const errors = []
      if (!this.$v.modelItem.minWidth.$dirty) return errors
      !this.$v.modelItem.minWidth.decimal && errors.push('Min width must be a decimal number.')
      return errors
    },
    maxWidthErrors() {
      const errors = []
      if (!this.$v.modelItem.maxWidth.$dirty) return errors
      !this.$v.modelItem.maxWidth.decimal && errors.push('Max width must be a decimal number.')
      !this.$v.modelItem.maxWidth.greaterThan && errors.push('Max width must be grater then min width.')
      return errors
    },
    thicknessErrors() {
      const errors = []
      if (!this.$v.modelItem.thickness.$dirty) return errors
      !this.$v.modelItem.thickness.decimal && errors.push('Thickness must be a decimal number.')
      return errors
    },
    baseDiameterErrors() {
      const errors = []
      if (!this.$v.modelItem.baseDiameter.$dirty) return errors
      !this.$v.modelItem.baseDiameter.decimal && errors.push('Max diameter must be a decimal number.')
      return errors
    },
    maxDiameterErrors() {
      const errors = []
      if (!this.$v.modelItem.maxDiameter.$dirty) return errors
      !this.$v.modelItem.maxDiameter.decimal && errors.push('Max diameter must be a decimal number.')
      !this.$v.modelItem.maxDiameter.greaterThan && errors.push('Max diameter must be grater then min diameter.')
      return errors
    },
    minDiameterErrors() {
      const errors = []
      if (!this.$v.modelItem.minDiameter.$dirty) return errors
      !this.$v.modelItem.minDiameter.decimal && errors.push('Min diameter must be a decimal number.')
      return errors
    },
    weightErrors() {
      const errors = []
      if (!this.$v.modelItem.weight.$dirty) return errors
      !this.$v.modelItem.weight.decimal && errors.push('Weight must be a decimal number.')
      return errors
    },
    coordNErrors() {
      const errors = []
      if (!this.$v.modelItem.coordN.$dirty) return errors
      !this.$v.modelItem.coordN.decimal && errors.push('Latitude must be a decimal number.')
      !this.$v.modelItem.coordN.between && errors.push('Latitude must be a value between 0.00 and 9329005.18.')
      !this.$v.modelItem.coordN.coordinateIsATriple && errors.push('Coordinate must have all the N, E, Z components.')
      return errors
    },
    coordEErrors() {
      const errors = []
      if (!this.$v.modelItem.coordE.$dirty) return errors
      !this.$v.modelItem.coordE.decimal && errors.push('Longitude must be a decimal number.')
      !this.$v.modelItem.coordE.between && errors.push('Longitude must be a value between 166021.44 and 833978.56.')
      !this.$v.modelItem.coordE.coordinateIsATriple && errors.push('Coordinate must have all the N, E, Z components.')
      return errors
    },
    coordZErrors() {
      const errors = []
      if (!this.$v.modelItem.coordZ.$dirty) return errors
      !this.$v.modelItem.coordZ.decimal && errors.push('Elevation must be a decimal number.')
      !this.$v.modelItem.coordZ.coordinateIsATriple && errors.push('Coordinate must have all the N, E, Z components.')
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
