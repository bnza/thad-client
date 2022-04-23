import ResourceFetchMixin from "~/mixins/ResourceFetchMixin";
export default {
  mixins: [
    ResourceFetchMixin
  ],
  computed: {
    routeIdParamKey() {
      return 'id'
    },
    routeRequestedId() {
      return this.$route.params[this.routeIdParamKey]
    }
  }
}
