import {clone, has, isEmpty} from "ramda";
import {diff} from "deep-object-diff";
import {normalizeRequestBodyData, normalizeResource} from "~/src/request";
import ResourceItemGetMixin from "~/mixins/ResourceItemGetMixin";
import ResourceNavigationMixin from "~/mixins/ResourceNavigationMixin";

const iriFormatters = {}

export default {
  mixins: [
    ResourceItemGetMixin,
    ResourceNavigationMixin
  ],
  data() {
    return {
      modelItem: {}
    }
  },
  computed: {
    normalizeResource() {
      return normalizeResource(this.modelItem)
    },
    updateItem() {
      return diff(this.item, this.modelItem)
    },
    isUpdate() {
      return !isEmpty(this.item)
    },
    requestMethod() {
      return this.isUpdate ? 'patch' : 'post'
    },
    requestUrl() {
      return this.isUpdate ? this.getItemResourceUrl(this.id) : this.resourceBaseUrl
    },
    requestHeaders() {
      const headers = {
        Accept: 'application/ld+json'
      }
      if (this.isUpdate) {
        headers['Content-Type'] = 'application/merge-patch+json'
      }
      return headers
    },
    requestData() {
      return normalizeRequestBodyData(this.updateItem)
    }
  },
  methods: {
    createdResourcePath(data) {
      return this.$route.fullPath.replace(/create$/, data.id)
    },
    formatIri(resourceName, id) {
      let iri = this.$config.apiPrefix
      iri = `${iri}/` + (has(resourceName, iriFormatters) ?
        iriFormatters[resourceName]() :
        resourceName)
      if (id) {
        iri = `${iri}/${id}`
      }
      return iri
    },
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        const response = await this.request({
          method: this.requestMethod,
          url: this.requestUrl,
          data: this.requestData,
          headers: this.requestHeaders
        })
        if (!this.isUpdate) {
          await this.$router.replace(this.createdResourcePath(response.data))
        } else {
          await this.$router.go(-1)
        }
      } catch (e) {
        await this.$store.dispatch('snackbar/requestError', e)
      }
    }
  },
  watch: {
    item(item) {
      this.modelItem = clone(item)
    }
  }
}
