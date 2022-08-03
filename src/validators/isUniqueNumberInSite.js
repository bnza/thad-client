import { ref, withParams } from "vuelidate/lib/validators/common";

export default (fn, resourceName, requestData) =>
  withParams({ type: 'isUniqueNumberInSite' }, async function(_, parentVm) {
    if (!requestData.number) {
      return true
    }
    const area = ref('area', this, parentVm)
    const site = ref('site', this, parentVm)
    const number = ref('number', this, parentVm)
    const siteId = area?.site?.id || site?.id
    if (!siteId) {
      return true
    }
    if (!number) {
      return true
    }
    return await fn({resourceName, siteId, number})
  })
