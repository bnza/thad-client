import {isEmpty} from "ramda";
import ResourceFetchMixin from "~/mixins/ResourceFetchMixin";
import {hasOwnProperty} from "~/src/utils";

export default {
  mixins: [
    ResourceFetchMixin
  ],
  async fetch() {
    if (!this.url) {
      return;
    }
    this.response = await this.request({
      method: 'get',
      url: this.url,
      headers: {
        Accept: 'application/ld+json'
      }
    })
  },
  computed: {
    idKey() {
      return 'id'
    },
    url() {
      return this.resourceName ? `${this.resourceName}/${this.id}` : ''
    },
    id() {
      return this.$route.params[this.idKey]
    }
  },
  methods: {
    getResponseValue(key, item) {
      item = item || this.responseData
      if (isEmpty(item)) {
        return
      }
      return key.split('.').reduce((obj, key) => {
        if (obj && hasOwnProperty(obj, key)) {
          return obj[key]
        }
        return false
      }, item)
    },
    getResponseDateString(key) {
      const date = this.getResponseValue(key)
      if (!date) {
        return
      }
      return (new Date(date)).toLocaleDateString()
    }
  },
  watch: {
    code() {
      this.$emit('ready', this.code)
    }
  }
}
