import {mapActions} from "vuex";
import {objectIsEmpty} from "~/src/utils";

export default {
  data() {
    return {
      response: {},
    }
  },
  fetchOnServer: false,
  fetchKey() {
    return `${this.resourceName}-${this.nextRequestCounter()}`
  },
  computed: {
    responseData() {
      return this.response.data || {}
    },
    emptyData() {
      return objectIsEmpty(this.responseData)
    }
  },
  methods: {
    ...mapActions('http', [
      'request',
      'nextRequestCounter'
    ])
  }
}
