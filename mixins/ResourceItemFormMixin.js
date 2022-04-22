import ResourceFetchMixin from "~/mixins/ResourceFetchMixin";
import ResourceItemDataAccessorMixin from "~/mixins/ResourceItemDataAccessorMixin";
import RouteResourceItemMixin from "~/mixins/RouteResourceItemMixin";


export default {
  mixins: [
    ResourceItemDataAccessorMixin,
    RouteResourceItemMixin,
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
  props: {
    idKey: {
      type: String,
      default: 'id'
    }
  },
  computed: {
    item() {
      return this.responseData
    },
    url() {
      return this.resourceName ? `${this.resourceName}/${this.routeRequestedId}` : ''
    },
    id() {
      return this.getResponseValue(this.idKey)
    }
  },
}
