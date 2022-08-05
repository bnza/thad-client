import { ref, withParams } from "vuelidate/lib/validators/common";

const isNullish = (v) => v === null || undefined === v;

export default () =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  withParams({ type: 'relationshipIsNotSelfReferencing' }, function(value, parentVm) {
    const refDxSU = ref('dxSU', this, parentVm)
    const refSxSU = ref('sxSU', this, parentVm)
    if ( isNullish(refDxSU) ) {
      return true
    }
    return ( isNullish(refSxSU) || refDxSU !== refSxSU)
  })
