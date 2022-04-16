import {mapActions} from "vuex";

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
  },
  methods: {
    ...mapActions('http', [
      'request',
      'nextRequestCounter'
    ])
  }
}
