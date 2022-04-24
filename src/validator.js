import {req} from "vuelidate/lib/validators/common";
import {decimal} from "vuelidate/lib/validators";

export const optionalDecimal = (value) => !req(value) || decimal(value)

