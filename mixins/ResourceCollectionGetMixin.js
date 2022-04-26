import {isEmpty, clone, mergeLeft} from "ramda";
import ResourceFetchMixin from "~/mixins/ResourceFetchMixin";
import ResourceNavigationMixin from "~/mixins/ResourceNavigationMixin";
import {formatOptionsArrayForQueryString} from "~/src/request";
import {paginationQueryToOptions, optionsToPaginationQuery} from "~/src/utils";

export default {
  data() {
    return {
      filters: {}
    }
  },
  mixins: [
    ResourceFetchMixin,
    ResourceNavigationMixin
  ],
  props: {
    tab: {
      type: String,
      default: ''
    },
    parentRequestFilterKey: {
      type: String,
      default: 'id'
    },
    parentFilterKey: {
      type: String,
      default: 'id'
    },
    parent: {
      default: null,
      validator (value) {
        return value === null || (typeof value === 'object')
      }
    }
  },
  async fetch() {
    this.response = await this.request({
      method: 'get',
      url: this.url,
      headers: {
        Accept: 'application/ld+json'
      },
      params: this.normalizedRequestOptions
    })
  },
  computed: {
    normalizedRequestOptions() {
      return formatOptionsArrayForQueryString({
        pagination: this.pagination,
        filters: this.normalizedFilters
      })
    },
    normalizedFilters() {
      let filters = clone(this.filters)
      if (this.isChild) {
        filters = mergeLeft({
          [this.parentRequestFilterKey]: this.parent[this.parentFilterKey]
        }, this.filters)
      }
      return filters
    },
    isChild() {
      return this.parent && !isEmpty(this.parent)
    },
    pagination: {
      get() {
        const paginationParent = this.tab ?
          (this.$route.query.tabs && this.$route.query.tabs[this.tab]) || {} :
          this.$route.query
        return paginationQueryToOptions(paginationParent.p || {})
      },
      set(pagination) {
        this.$router.replace({ query: optionsToPaginationQuery(pagination, this.tab, this.$route.query)})
      }
    },
    items() {
      return this.responseData['hydra:member'] || []
    },
    totalItems() {
      return this.responseData['hydra:totalItems'] || 0
    },
    url() {
      return this.resource.collectionUrl
    }
  },
  watch: {
    normalizedRequestOptions: {
      handler() {
        this.$fetch()
      },
      deep: true
    },
  },
}
