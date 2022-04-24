import { ref, withParams } from "vuelidate/lib/validators/common";

export default (prop) =>
  withParams({ type: 'greaterThan', prop }, function(value, parentVm) {
    const refValue = ref(prop, this, parentVm)
    if (
      value === '' ||
      undefined === value ||
      refValue === '' ||
      undefined === refValue ) {
      return true
    }
    return 1 * value > 1 * refValue
  })
