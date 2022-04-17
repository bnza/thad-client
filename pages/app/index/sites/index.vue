<template>
  <v-card>
    <v-toolbar flat dense>
      <v-toolbar-title>Sites</v-toolbar-title>
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
      <template #[`item.id`]="{ item }">
        <navigation-resource-item-crud
          :item-id="item.id.toString()" resource-base-url="/app/sites/"
          />
      </template>
      <template #[`item.code`]="{ item }">
        <navigation-resource-item-chip
          :link-text="item.code"
          :item-id="item.id.toString()"
          resource-base-url="/app/sites/" />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ResourceCollectionTableMixin from "@/mixins/ResourceCollectionTableMixin";
import NavigationResourceItemCrud from "@/components/NavigationResourceItemCrud";
import NavigationResourceItemChip from "@/components/NavigationResourceItemChip";

export default {
  name: "IndexSitesPage",
  components: {
    NavigationResourceItemChip,
    NavigationResourceItemCrud
  },
  mixins: [
    ResourceCollectionTableMixin
  ],
  computed: {
    resourceName() {
      return 'sites'
    }
  }
}
</script>
