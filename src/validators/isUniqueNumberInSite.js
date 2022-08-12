import { ref, withParams } from "vuelidate/lib/validators/common";

export default (fn, resourceName, requestData, validatingValuesChanged) =>
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
    if (
      !validatingValuesChanged
      || !(validatingValuesChanged.number || validatingValuesChanged.site)
    ) {
      return true
    }
    validatingValuesChanged.number = false
    validatingValuesChanged.site = false
    return await fn({resourceName, siteId, number})
  })
