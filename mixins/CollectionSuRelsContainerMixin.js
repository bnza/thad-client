import {mapGetters} from "vuex";
import {isEmpty} from "ramda";
import ResourceDeleteDialogMixin from "~/mixins/ResourceDeleteDialogMixin";
import ResourceFetchMixin from "~/mixins/ResourceFetchMixin";
import ResourceNavigationMixin from "~/mixins/ResourceNavigationMixin";

export default {
  mixins: [
    ResourceDeleteDialogMixin,
    ResourceFetchMixin,
    ResourceNavigationMixin
  ],
  props: {
    parent: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditingEnabled: false,
      createSuRelDialog: {
        visible: false,
        sxSu: {},
        relationship: {}
      }
    }
  },
  async fetch() {
    if (!this.parent?.id) {
      return
    }
    this.response = await this.request({
      method: 'get',
      url: this.resource.collectionUrl,
      headers: {
        Accept: 'application/ld+json'
      },
      params: {
        sxSU: this.parent.id
      }
    })
  },
  computed: {
    ...mapGetters('vocabularies', ['getVocabulary']),
    editingButtonTooltip() {
      return this.isEditingEnabled ? 'Disable editing' : 'Enable editing'
    },
    editingButtonIcon() {
      return this.isEditingEnabled ? 'mdi-pencil-outline' : 'mdi-pencil'
    },
    relationships() {
      return this.getVocabulary(this.resourceName.substring(13).toLowerCase())
    },
    items() {
      return this.responseData['hydra:member'] || []
    }
  },
  watch: {
    'parent.id': {
      handler() {
        this.$fetch()
      },
      immediate: true
    }
  },
  methods: {
    isEmpty,
    openCreateDialog(relationship) {
      this.createSuRelDialog.relationship = this.relationships.find(r => r['@id'] === relationship)
      this.createSuRelDialog.sxSu = this.parent
      this.createSuRelDialog.visible = true
    }
  }
}
