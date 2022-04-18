export default {
  computed: {
    tab: {
      get () {
        return this.$route.query.tab || 0
      },
      set(tab) {
        this.$router.replace({ query: { ...this.$route.query, tab } })
      }
    },
  },
}
