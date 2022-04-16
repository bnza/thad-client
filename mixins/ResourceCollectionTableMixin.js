// import {mapActions} from "vuex";
import ResourceFetchMixin from "~/mixins/ResourceFetchMixin";
import {formatOptionsArrayForQueryString} from "~/src/request";

export default {
  data() {
    return {
      pagination: {}
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
      },
      params: formatOptionsArrayForQueryString({
        pagination: this.pagination
      })
    })
  },
  computed: {
    items() {
      return this.responseData['hydra:member'] || []
    },
    totalItems() {
      return this.responseData['hydra:totalItems'] || 0
    },
    url() {
      return `${this.resourceName}`
    }
  },
  watch: {
    pagination: {
      handler() {
        this.$fetch()
      },
      deep: true
    }
  },
}
