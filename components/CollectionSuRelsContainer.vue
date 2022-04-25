<template>
  <v-container>
    <v-row>
      <collection-su-rel-card
        :items="items"
        iri="/api/vocabulary/su/relationships/c"
        name="covers"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
      <collection-su-rel-card
        :items="items"
        iri="/api/vocabulary/su/relationships/C"
        name="covered by"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
      <collection-su-rel-card
        :items="items"
        iri="/api/vocabulary/su/relationships/x"
        name="cuts"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
      <collection-su-rel-card
        :items="items"
        iri="/api/vocabulary/su/relationships/X"
        name="cut by"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
    </v-row>
    <v-row>
      <collection-su-rel-card
        :items="items"
        iri="/api/vocabulary/su/relationships/f"
        name="fills"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
      <collection-su-rel-card
        :items="items"
        iri="/api/vocabulary/su/relationships/F"
        name="filled by"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
      <collection-su-rel-card
        :items="items"
        iri="/api/vocabulary/su/relationships/a"
        name="abuts"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
      <collection-su-rel-card
        :items="items"
        iri="/api/vocabulary/su/relationships/A"
        name="abutted by"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
    </v-row>
    <v-row>
      <collection-su-rel-card
        :items="items"
        iri="/api/vocabulary/su/relationships/b"
        name="binds with"
        @delete="openDeleteDialog"
        @create="openCreateDialog"

      />
      <collection-su-rel-card
        :items="items"
        iri="/api/vocabulary/su/relationships/e"
        name="equals"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
    </v-row>
    <create-su-rel-dialog
      v-if="!isEmpty(createSuRelDialog.sxSu)"
      :relationship="createSuRelDialog.relationship"
      :sx-su="createSuRelDialog.sxSu"
      :visible.sync="createSuRelDialog.visible"
      @created="$fetch"
    />
    <delete-resource-dialog
      v-if="deletingItem"
      resource-name="stratigraphic_relationships"
      :visible.sync="deleteDialog"
      :item="deletingItem"
      @itemDeleted="resetAndFetch"
    >
      <delete-su-rel-card-text :item="deletingItem" />
    </delete-resource-dialog>
  </v-container>
</template>

<script>
import {isEmpty} from "ramda";
import {mapState} from "vuex";
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import ResourceFetchMixin from "@/mixins/ResourceFetchMixin";
import CreateSuRelDialog from "@/components/CreateSuRelDialog";
import CollectionSuRelCard from "@/components/CollectionSuRelCard";
import DeleteResourceDialog from "@/components/DeleteResourceDialog";
import DeleteSuRelCardText from "@/components/DeleteSuRelCardText";

export default {
  name: "CollectionSuRelationshipsContainer",
  components: {
    CollectionSuRelCard,
    DeleteResourceDialog,
    DeleteSuRelCardText,
    CreateSuRelDialog
  },
  mixins: [
    ResourceDeleteDialogMixin,
    ResourceFetchMixin
  ],
  props: {
    parent: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
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
      url: this.resourceName,
      headers: {
        Accept: 'application/ld+json'
      },
      params: {
        sxSU: this.parent.id
      }
    })
  },
  computed: {
    ...mapState('vocabularies', {relationships: 'su_relationships'}),
    items() {
      return this.responseData['hydra:member'] || []
    }
  },
  methods: {
    isEmpty,
    openCreateDialog(relationship) {
      this.createSuRelDialog.relationship = this.relationships.find(r => r['@id'] === relationship)
      this.createSuRelDialog.sxSu = this.parent
      this.createSuRelDialog.visible = true
    }
  },
  watch: {
    'parent.id': {
      handler() {
        this.$fetch()
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
