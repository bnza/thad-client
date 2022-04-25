import {isEmpty} from "ramda";
import ResourceFetchMixin from "~/mixins/ResourceFetchMixin";
import ResourceNavigationMixin from "~/mixins/ResourceNavigationMixin";

export default {
  mixins: [
    ResourceFetchMixin,
    ResourceNavigationMixin
  ],
  computed: {
    ready() {
      return !isEmpty(this.item);
    },
    item() {
      return this.responseData
    },
    routeIdParamKey() {
      return 'id'
    },
    id() {
      return this.$route.params[this.routeIdParamKey]
    }
  },
  async fetch() {
    if (!this.id) {
      return;
    }
    try {
      this.response = await this.request({
        method: 'get',
        url: this.getItemResourceUrl(this.id),
        headers: {
          Accept: 'application/ld+json'
        }
      })
    } catch (e) {
      await this.$store.dispatch('snackbar/requestError', e)
    }
  },
  watch: {
    id() {
      this.$fetch()
    }
  }
}
