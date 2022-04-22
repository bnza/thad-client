export default {
  props: {
    resourceName: {
      type: String,
      required: true
    }
  },
  computed: {
    resourceBasePath() {
      return `/app/${this.resourceName}`
    },
    resourceBaseUrl() {
      return this.resourceName
    },
    createResourcePath() {
      return `${this.resourceBasePath}/create`
    }
  },
  methods: {
    getItemResourcePath(id) {
      return `${this.resourceBasePath}/${id}`
    },
    getItemResourceUpdatePath(id) {
      return `${this.resourceBasePath}/${id}/update`
    },
    getItemResourceUrl(id) {
      return `${this.resourceBaseUrl}/${id}`
    },
  }
}
