<template>
  <v-container data-cy="collection-su-st-rel-container">
    <v-row dense class="text-right">
      <v-spacer />
      <v-col>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              data-cy="su-st-enable-editing-btn"
              :disabled="!$auth.hasScope('ROLE_EDITOR')"
              color="primary"
              v-bind="attrs"
              icon
              x-small
              v-on="on"
              @click="isEditingEnabled = !isEditingEnabled"
            >
              <v-icon>
                {{editingButtonIcon}}
              </v-icon>
            </v-btn>
          </template>
          <span>{{editingButtonTooltip}}</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row dense>
      <collection-su-rel-card
        :enabled="isEditingEnabled"
        :items="items"
        iri="/api/vocabulary/su/relationships/c"
        name="covers"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
      <collection-su-rel-card
        :enabled="isEditingEnabled"
        :items="items"
        iri="/api/vocabulary/su/relationships/C"
        name="covered by"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
      <collection-su-rel-card
        :enabled="isEditingEnabled"
        :items="items"
        iri="/api/vocabulary/su/relationships/x"
        name="cuts"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
      <collection-su-rel-card
        :enabled="isEditingEnabled"
        :items="items"
        iri="/api/vocabulary/su/relationships/X"
        name="cut by"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
    </v-row>
    <v-row dense>
      <collection-su-rel-card
        :enabled="isEditingEnabled"
        :items="items"
        iri="/api/vocabulary/su/relationships/f"
        name="fills"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
      <collection-su-rel-card
        :enabled="isEditingEnabled"
        :items="items"
        iri="/api/vocabulary/su/relationships/F"
        name="filled by"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
      <collection-su-rel-card
        :enabled="isEditingEnabled"
        :items="items"
        iri="/api/vocabulary/su/relationships/a"
        name="abuts"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
      <collection-su-rel-card
        :enabled="isEditingEnabled"
        :items="items"
        iri="/api/vocabulary/su/relationships/A"
        name="abutted by"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
    </v-row>
    <v-row dense>
      <collection-su-rel-card
        :enabled="isEditingEnabled"
        :items="items"
        iri="/api/vocabulary/su/relationships/b"
        name="binds with"
        @delete="openDeleteDialog"
        @create="openCreateDialog"

      />
      <collection-su-rel-card
        :enabled="isEditingEnabled"
        :items="items"
        iri="/api/vocabulary/su/relationships/e"
        name="equals"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
    </v-row>
    <create-su-rel-dialog
      v-if="!isEmpty(createSuRelDialog.sxSu)"
      :resource-name="resourceName"
      :relationship="createSuRelDialog.relationship"
      :sx-su="createSuRelDialog.sxSu"
      :visible.sync="createSuRelDialog.visible"
      @created="$fetch"
    />
    <delete-resource-dialog
      v-if="deletingItem"
      :resource-name="resourceName"
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
import {mapGetters} from "vuex";
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
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
      return this.getVocabulary('relationship')
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
</script>

<style scoped>

</style>
