import { ref, withParams } from "vuelidate/lib/validators/common";

export default (fn, resourceName, requestData) =>
  withParams({ type: 'isUniqueNumberInSU' }, async function(_, parentVm) {
    if (!requestData.number) {
      return true
    }
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
