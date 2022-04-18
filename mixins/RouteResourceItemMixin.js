export default {
  computed: {
    routeIdParamKey() {
      return 'id'
    },
    routeRequestedId() {
      return this.$route.params[this.routeIdParamKey]
    }
  }
}
