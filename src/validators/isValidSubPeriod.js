import { ref, withParams } from "vuelidate/lib/validators/common";

const isNullish = (v) => v === null || undefined === v;

export default (period,subperiod) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  withParams({ type: 'isValidSubPeriod', period, subperiod }, function(value, parentVm) {
    period = period || 'period'
    subperiod = subperiod || 'subperiod'
    const refPeriod = ref(period, this, parentVm)
    const refSubperiod = ref(subperiod, this, parentVm)
    if ( isNullish(refSubperiod) ) {
      return true
    }
    return ( isNullish(refPeriod) || refSubperiod.period.id === refPeriod.id)
  })
