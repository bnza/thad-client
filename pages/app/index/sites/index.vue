<template>
  <v-card>
    <v-toolbar flat dense>
      <v-toolbar-title>Sites</v-toolbar-title>
      <v-spacer />
      <navigation-create-resource-button
        v-if="$auth.hasScope('ROLE_ADMIN')"
        resource-base-path="/app/sites"
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
          :item-id="tItem.id.toString()" resource-base-path="/app/sites"
          @delete="openDeleteDialog(tItem)"
          />
      </template>
      <template #[`item.code`]="{ item : tItem }">
        <navigation-resource-item-chip
          :link-text="tItem.code"
          :item-id="tItem.id.toString()"
          resource-base-path="/app/sites" />
      </template>
    </v-data-table>
    <delete-resource-dialog
      resource-base-path="/app/sites"
      :visible.sync="deleteDialog"
      :item="deletingItem"
      @itemDeleted="$fetch"
    />
  </v-card>
</template>

<script>
import RouteResourceCollectionTableMixin from "@/mixins/RouteResourceCollectionTableMixin";
import NavigationCreateResourceButton from "@/components/NavigationCreateResourceButton";
import NavigationResourceItemCrud from "@/components/NavigationResourceItemCrud";
import NavigationResourceItemChip from "@/components/NavigationResourceItemChip";
import DeleteResourceDialog from "@/components/DeleteResourceDialog";

export default {
  name: "IndexSitesPage",
  components: {
    DeleteResourceDialog,
    NavigationCreateResourceButton,
    NavigationResourceItemChip,
    NavigationResourceItemCrud
  },
  mixins: [
    RouteResourceCollectionTableMixin
  ],
  data() {
    return {
      deleteDialog: false,
      deletingItem: {}
    }
  },
/*   computed: {
    resourceName() {
      return 'sites'
    }
  }, */
  methods: {
    openDeleteDialog(item) {
      this.item = item
      this.deleteDialog = true
    }
  }
}
</script>
