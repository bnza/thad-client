import {mapActions} from "vuex";

export default {
  data() {
    return {
      response: {},
    }
  },
  props: {
    resourceName: {
      type: String,
      required: true
    },
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
