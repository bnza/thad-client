import {isEmpty, clone, mergeLeft} from "ramda";
import {mapGetters, mapState} from "vuex";
import ResourceFetchMixin from "~/mixins/ResourceFetchMixin";
import ResourceNavigationMixin from "~/mixins/ResourceNavigationMixin";
import {formatOptionsArrayForQueryString} from "~/src/request";
import {appFiltersToQueryStringObject} from "~/src/hydra/filters";

export default {
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
    ...mapGetters('collections', ['getPagination', 'getFilters']),
    ...mapState(['workSite']),
    componentId() {
      let id = `Collection.${this.resourceName}`
      if (this.isChild) {
        id += `Collection.${this.parent['@type']}.${this.parent.id}`
      }
      return id
    },
    normalizedRequestOptions() {
      return formatOptionsArrayForQueryString({
        pagination: this.pagination || {},
        filters: this.normalizedFilters
      })
    },
    normalizedFilters() {
      let filters = clone(this.filters)
      filters = appFiltersToQueryStringObject(filters)
      if (this.isChild) {
        filters = mergeLeft({
          [this.parentRequestFilterKey]: this.parent[this.parentFilterKey]
        }, this.filters)
      }
      return filters
    },
    isFiltered() {
      return !!this.filters.length
    },
    isChild() {
      return this.parent && !isEmpty(this.parent)
    },
    pagination: {
      get() {
        return this.getPagination(this.componentId)
      },
      set(options) {
        this.$store.commit('collections/setPagination', {componentId:this.componentId, options})
      }
    },
    filters: {
      get() {
        return this.getFilters(this.componentId)
      },
      set(filters) {
        this.$store.commit('collections/setFilters', {componentId:this.componentId, filters})
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
    workSite: {
      handler() {
        this.$fetch()
      },
      deep: true
    },
    normalizedRequestOptions: {
      handler() {
        this.$fetch()
      },
      deep: true
    },
  },
}
