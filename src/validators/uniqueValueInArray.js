import { ref, withParams } from "vuelidate/lib/validators/common";

export default (prop) =>
  withParams({ type: 'uniqueValueInArray', prop }, function(value, parentVm) {
    const refValue = ref(prop, this, parentVm)
    if (
      value === '' ||
      undefined === value) {
      return true
    }
    if (!Array.isArray(refValue)) {
      return true
    }
    return !refValue.includes(value)
  })
