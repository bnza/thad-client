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
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modelItem: {}
    }
  },
  computed: {
    updateCodeDisabled() {
      return this.isUpdate && !this.$auth.hasScope('ROLE_ADMIN')
    },
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
    async isInvalid() {
      if (!this.$v) {
        return false
      }
      await this.$v.$touch()
      return this.$v.$invalid
    },
    async beforeSubmit() {},
    async afterCreate() {},
    async afterUpdate() {},
    async submit() {
      try {
        this.$emit('update:loading', true)
        await this.beforeSubmit()
        if (await this.isInvalid()) {
          return
        }
        let response = null
        if (this.requestData && !isEmpty(this.requestData)){
          response = await this.request({
            method: this.requestMethod,
            url: this.requestUrl,
            data: this.requestData,
            headers: this.requestHeaders
          })
        } else {
          await this.$store.dispatch('snackbar/show', {
            text: 'No change. Skip'
          })
        }
        if (!this.isUpdate) {
          await this.afterCreate(response)
          await this.navigateAfterCreate(response)
        } else {
          await this.afterUpdate(response)
          await this.navigateAfterUpdate(response)
        }
      } catch (e) {
        await this.$store.dispatch('snackbar/requestError', e)
      } finally {
        this.$emit('update:loading', false)
      }
    },
    async navigateAfterCreate(response) {
      await this.$router.replace(this.createdResourcePath(response.data))
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async navigateAfterUpdate(response) {
      await this.$router.go(-1)
    }
  },
  watch: {
    item(item) {
      this.modelItem = clone(item)
    }
  }
}
