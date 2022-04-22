<template>
  <v-card data-cy="collection-sites-card">
    <v-toolbar flat dense>
      <v-toolbar-title>Sites</v-toolbar-title>
      <v-spacer />
      <navigation-create-resource-button
        v-if="$auth.hasScope('ROLE_ADMIN')"
        resource-name="sites"
        :disabled="false"
      />
    </v-toolbar>
    <v-data-table
      multi-sort
      dense
      :headers="[
      {
        text: 'actions',
        value: 'id',
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
          :item-id="tItem.id.toString()"
          resource-name="sites"
          @delete="openDeleteDialog(tItem)"
        />
      </template>
      <template #[`item.code`]="{ item : tItem }">
        <navigation-resource-item-chip
          :link-text="tItem.code"
          :item-id="tItem.id.toString()"
          resource-name="sites" />
      </template>
    </v-data-table>
    <delete-resource-dialog
      v-if="deletingItem"
      resource-name="sites"
      :visible.sync="deleteDialog"
      :item="deletingItem"
      @itemDeleted="resetAndFetch"
    >
      <delete-site-card-text :item="deletingItem" />
    </delete-resource-dialog>
  </v-card>
</template>

<script>
import DeleteResourceDialog from "@/components/DeleteResourceDialog";
import DeleteSiteCardText from "@/components/DeleteSiteCardText";
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import NavigationCreateResourceButton from "@/components/NavigationCreateResourceButton";
import NavigationResourceItemChip from "@/components/NavigationResourceItemChip";
import NavigationResourceItemCrud from "@/components/NavigationResourceItemCrud";
import RouteResourceCollectionTableMixin from "@/mixins/RouteResourceCollectionTableMixin";

export default {
  name: "CollectionSitesCard",
  components: {
    DeleteResourceDialog,
    DeleteSiteCardText,
    NavigationCreateResourceButton,
    NavigationResourceItemChip,
    NavigationResourceItemCrud
  },
  mixins: [
    ResourceDeleteDialogMixin,
    RouteResourceCollectionTableMixin
  ],
}
</script>

<style scoped>

</style>
