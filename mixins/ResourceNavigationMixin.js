export default {
  props: {
    resourceBasePath: {
      type: String,
      required: true
    }
  },
  computed: {
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
    getItemResourceDeletePath(id) {
      return `${this.resourceBasePath}/${id}/delete`
    },
  }
}
