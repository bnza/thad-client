<template>
  <v-card data-cy="collection-areas-card">
    <v-toolbar flat dense>
      <v-toolbar-title v-if="!isChild">Areas</v-toolbar-title>
      <v-toolbar-title v-if="isFiltered" class="secondary--text mx-4"> (filtered) </v-toolbar-title>
      <v-spacer />
      <navigation-filter-collection-button @click="filterDialog = true"/>
      <navigation-create-resource-button
        v-if="$auth.hasScope('ROLE_ADMIN')"
        :parent="parent"
        :resource-name="resourceName"
        :disabled="false"
      />
    </v-toolbar>
    <v-data-table
      multi-sort
      dense
      :loading="$fetchState.pending"
      :items-per-page="10"
      :footer-props="{
        disableItemsPerPage: true
      }"
      :headers="[
      {
        text: 'actions',
        value: 'id',
        align: 'center'
      },
      {
        text: 'site',
        value: 'site.code',
        align: 'center'
      },
      {
        text: 'code',
        value: 'code',
        align: 'center'
      },
      {
        text: 'name',
        value: 'name',
      },
      {
        text: 'description',
        value: 'description'
      }
    ]"
      :items="items"
      :options.sync="pagination"
      :server-items-length="totalItems"
    >
      <template #[`item.id`]="{ item : tItem }">
        <navigation-resource-item-crud
          :item-id="tItem.id"
          :resource-name="resourceName"
          @delete="openDeleteDialog(tItem)"
        />
      </template>
      <template #[`item.code`]="{ item : tItem }">
        <navigation-resource-item-chip
          :link-text="tItem.code"
          :item-id="tItem.id"
          :resource-name="resourceName"
        />
      </template>
      <template #[`item.site.code`]="{ item : tItem }">
        <navigation-resource-item-chip
          :link-text="tItem.site.code"
          :item-id="tItem.site.id"
          resource-name="site" />
      </template>
    </v-data-table>
    <filter-collection-dialog
      v-if="responseData['hydra:search']"
      :resource-name="resourceName"
      :visible.sync="filterDialog"
      :hydra-search="responseData['hydra:search']"
      :filters.sync="filters"
    />
    <delete-resource-dialog
      v-if="deletingItem"
      :resource-name="resourceName"
      :visible.sync="deleteDialog"
      :item="deletingItem"
      @itemDeleted="resetAndFetch"
    >
      <delete-area-card-text :item="deletingItem" />
    </delete-resource-dialog>
  </v-card>
</template>

<script>
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import ResourceCollectionGetMixin from "@/mixins/ResourceCollectionGetMixin";
import FilterCollectionDialog from "@/components/filters/FilterCollectionDialog";

export default {
  name: "CollectionsAreaCard",
  components: {
    FilterCollectionDialog
  },
  mixins: [
    ResourceDeleteDialogMixin,
    ResourceCollectionGetMixin
  ],
}
</script>

<style scoped>

</style>
