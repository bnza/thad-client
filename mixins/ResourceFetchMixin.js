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
    resourceName() {
      return /\/app\/(\w+)/.exec(this.$route.path)[1]
    },
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
