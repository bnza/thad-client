<template>
  <v-container data-cy="collection-su-seq-rel-container">
    <v-row dense class="text-right">
      <v-spacer />
      <v-col>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              data-cy="su-seq-enable-editing-btn"
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
        iri="/api/vocabulary/su/sequences/-1"
        name="earlier than"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
      <collection-su-rel-card
        :enabled="isEditingEnabled"
        :items="items"
        iri="/api/vocabulary/su/sequences/0"
        name="contemporary with"
        @delete="openDeleteDialog"
        @create="openCreateDialog"
      />
      <collection-su-rel-card
        :enabled="isEditingEnabled"
        :items="items"
        iri="/api/vocabulary/su/sequences/1"
        name="later than"
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
      :parent="parent"
      @created="$fetch"
    />
    <delete-resource-dialog
      v-if="deletingItem"
      :resource-name="resourceName"
      :visible.sync="deleteDialog"
      :item="deletingItem"
      @itemDeleted="resetAndFetch"
    >
      <delete-su-rel-card-text :item="deletingItem" :resource-name="resourceName"/>
    </delete-resource-dialog>
  </v-container>
</template>

<script>
import CollectionSuRelsContainerMixin from "@/mixins/CollectionSuRelsContainerMixin";

export default {
  name: "CollectionSuSequenceContainer",
  mixins: [
    CollectionSuRelsContainerMixin,
  ],
}
</script>
