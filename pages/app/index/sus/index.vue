<template>
  <v-card>
    <v-toolbar flat dense>
      <v-toolbar-title>Stratigraphic units</v-toolbar-title>
    </v-toolbar>
    <v-data-table
      multi-sort
      dense
      :headers="[
      {
        text: 'id',
        value: 'id',
      },
      {
        text: 'site',
        value: 'site.code',
        align: 'center'
      },
      {
        text: 'area',
        value: 'area.code',
        align: 'center'
      },
      {
        text: 'number',
        value: 'number'
      },
      {
        text: 'type',
        value: 'type.value'
      },
      {
        text: 'preservation',
        value: 'preservationState.value'
      },
      {
        text: 'top elev. (m)',
        value: 'topElevation'
      },
      {
        text: 'bottom elev. (m)',
        value: 'bottomElevation'
      },
      {
        text: 'compiler',
        value: 'compiler'
      },
      {
        text: 'date',
        value: 'date'
      }
    ]"
      :items="items"
      :options.sync="pagination"
      :server-items-length="totalItems"
    >
      <template #[`item.site.code`]="{ item }">
        <navigation-resource-item-chip
          :link-text="item.site.code"
          :item-id="item.site.id"
          resource-base-url="/app/sites/" />
      </template>
      <template #[`item.area.code`]="{ item }">
        <navigation-resource-item-chip
          :link-text="item.area.code"
          :item-id="item.area.id"
          resource-base-url="/app/areas/" />
      </template>
      <template #[`item.date`]="{ item }">
        {{ new Date(item.date).toLocaleDateString() }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ResourceCollectionTableMixin from "@/mixins/ResourceCollectionTableMixin";
import NavigationResourceItemChip from "@/components/NavigationResourceItemChip";

export default {
  name: "IndexSusPage",
  mixins: [
    ResourceCollectionTableMixin
  ],
  components: {
    NavigationResourceItemChip
  },
  computed: {
    resourceName() {
      return 'stratigraphic_units'
    }
  }
}
</script>
