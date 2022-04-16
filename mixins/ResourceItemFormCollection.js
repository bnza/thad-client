import {isEmpty} from "ramda";
import ResourceFetchMixin from "~/mixins/ResourceFetchMixin";
export default {
  data() {
    return {
      response: {}
    }
  },
  mixins: [
    ResourceFetchMixin
  ],
  async fetch() {
    this.response = await this.request({
      method: 'get',
      url: this.url,
      headers: {
        Accept: 'application/ld+json'
      }
    })
  },
  computed: {
    url() {
      return `${this.resourceName}/${this.$route.params.id}`
    }
  },
  methods: {
    getResponseValue(key) {
      if (isEmpty(this.responseData)) {
        return
      }
      return key.split('.').reduce((prev, curr) => prev[curr], this.responseData)
    },
    getResponseDateString(key) {
      const date = this.getResponseValue(key)
      if (!date) {
        return
      }
      return (new Date(date)).toLocaleDateString()
    }
  }
}
