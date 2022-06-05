import { validationMixin } from 'vuelidate'
import { required, integer, decimal } from 'vuelidate/lib/validators'
import greaterThan from "~/src/validators/greaterThan";

export default {
  mixins: [validationMixin],
  validations: {
    modelItem: {
      stratigraphicUnit: { required },
      number: { required, integer },
      type: {required },
      material: {required },
      preservation: {required },
      length: { decimal },
      height: { decimal },
      width: { decimal },
      minWidth: { decimal },
      maxWidth: { decimal, greaterThan: greaterThan('minWidth') },
      thickness: { decimal },
      baseDiameter: { decimal },
      minDiameter: { decimal },
      maxDiameter: { decimal, greaterThan: greaterThan('minDiameter')},
      weight: {decimal}
    },
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
      !this.$v.modelItem.preservation.required && errors.push('material is required.')
      return errors
    },
    numberErrors() {
      const errors = []
      if (!this.$v.modelItem.number.$dirty) return errors
      !this.$v.modelItem.number.required && errors.push('Ecofact number is required.')
      !this.$v.modelItem.number.integer && errors.push('Ecofact number must be an integer number.')
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