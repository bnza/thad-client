import { ref, withParams } from "vuelidate/lib/validators/common";

export default (fn, resourceName) =>
  withParams({ type: 'isUniqueNumberInSite' }, async function(_, parentVm) {
    const area = ref('area', this, parentVm)
    const number = ref('number', this, parentVm)
    const siteId = area?.site?.id
    if (!siteId) {
      return true
    }
    if (!number) {
      return true
    }
    return await fn({resourceName, siteId, number})
  })
