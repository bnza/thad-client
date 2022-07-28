import { ref, withParams } from "vuelidate/lib/validators/common";

export default (limit, prop) =>
  withParams({ type: 'fileSizeLessThan', limit, prop }, function(value, parentVm) {
    const refValue = ref(prop || 'file', this, parentVm)
    if (!value) {
      return true
    }
    if (!(refValue instanceof File)) {
      return true
    }
    return refValue.size < limit * 1024 * 1024
  })
