import { ref, withParams } from "vuelidate/lib/validators/common";

const isNullish = (v) => v === '' || undefined === v;

export default (coordN,coordE,coordZ) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  withParams({ type: 'coordinateIsATriple', coordN, coordE, coordZ }, function(value, parentVm) {
    coordN = coordN || 'coordN'
    coordE = coordE || 'coordE'
    coordZ = coordZ || 'coordZ'
    const refValueN = ref(coordN, this, parentVm)
    const refValueE = ref(coordE, this, parentVm)
    const refValueZ = ref(coordZ, this, parentVm)
    if ( isNullish(coordN) && isNullish(coordE) && isNullish(coordZ)) {
      return true
    }
    return !isNaN(refValueN) && !isNaN(refValueE) && !isNaN(refValueZ)
  })
