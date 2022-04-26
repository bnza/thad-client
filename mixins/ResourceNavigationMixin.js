export default {
  props: {
    resourceName: {
      type: String,
      required: true
    }
  },
  computed: {
    resource() {
      return this.$store.getters['api/getResource'](this.resourceName)
    },
    resourceBasePath() {
      return this.resource.collectionPath
    },
    resourceBaseUrl() {
      return this.resource.collectionUrl
    },
    createResourcePath() {
      return `${this.resourceBasePath}/create`
    }
  },
  methods: {
    getItemResourcePath(id) {
      return this.resource.itemPath(id)
    },
    getItemResourceUpdatePath(id) {
      return `${this.getItemResourcePath(id)}/update`
    },
    getItemResourceUrl(id) {
      return this.resource.itemUrl(id)
    },
  }
}
