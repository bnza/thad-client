import { ref, withParams } from "vuelidate/lib/validators/common";

export default (fn, resourceName) =>
  withParams({ type: 'isUniqueNumberInSU' }, async function(_, parentVm) {
    const su = ref('stratigraphicUnit', this, parentVm)
    const number = ref('number', this, parentVm)
    const suId = su?.id
    if (!suId) {
      return true
    }
    if (!number) {
      return true
    }
    return await fn({resourceName, suId, number})
  })
