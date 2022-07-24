import {clone, mergeLeft, has} from "ramda";
import {mapGetters, mapState} from "vuex";
import ResourceFetchMixin from "~/mixins/ResourceFetchMixin";
import ResourceNavigationMixin from "~/mixins/ResourceNavigationMixin";
import ResourceCollectionParentMixin from "~/mixins/ResourceCollectionParentMixin";
import {formatOptionsArrayForQueryString, downloadCsv} from "~/src/request";
import {appFiltersToQueryStringObject} from "~/src/hydra/filters";

export default {
  mixins: [
    ResourceFetchMixin,
    ResourceNavigationMixin,
    ResourceCollectionParentMixin
  ],
  props: {
    tab: {
      type: String,
      default: ''
    },
    enablePagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      filterDialog: false,
      downloadDialog: false,
      downloading: false
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
  methods: {
    async downloadCsv() {
      const params = clone(this.normalizedRequestOptions)
      if (has('itemsPerPage', params)) {
        delete params.itemsPerPage
        delete params.page
      }
      params.pagination = false
      this.downloading = true
      try {
        const response = await this.request({
          method: 'get',
          url: `${this.url}/export`,
          headers: {
            Accept: 'text/csv'
          },
          params
        })
        downloadCsv(this.resourceName, response.data)
        this.downloadDialog = false
      } catch (e) {
        await this.$store.dispatch('snackbar/requestError', e)
      } finally {
        this.downloading = false
      }
    }
  },
  computed: {
    ...mapGetters('collections', ['getPagination', 'getFilters', 'getCodeFilter']),
    ...mapState(['workSite']),
    componentId() {
      let id = `Collection.${this.resourceName}`
      if (this.isChild) {
        id += `Collection.${this.parent['@type']}.${this.parent.id}`
      }
      return id
    },
    normalizedRequestOptions() {
      let pagination = false
      if (this.enablePagination) {
        pagination = this.pagination || {
          itemsPerPage: 10
        }
      }
      return formatOptionsArrayForQueryString({
        pagination,
        filters: this.normalizedFilters
      })
    },
    normalizedFilters() {
      let filters = clone(this.filters)
      filters = appFiltersToQueryStringObject(filters)
      if (this.codeFilter) {
        filters['appId.code'] = this.codeFilter
      }
      if (this.isChild) {
        filters = mergeLeft({
          [this.parentRequestFilterKey]: this.parent[this.parentFilterKey]
        }, filters)
      }
      return filters
    },
    isFiltered() {
      return !!this.filters.length
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
    codeFilter: {
      get() {
        return this.getCodeFilter(this.componentId)
      },
      set(filter) {
        this.$store.commit('collections/setCodeFilter', {componentId:this.componentId, filter})
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
