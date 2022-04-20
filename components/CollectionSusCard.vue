<template>
  <v-card>
    <v-toolbar flat dense>
      <v-toolbar-title v-if="!isChild">Stratigraphic units</v-toolbar-title>
      <v-spacer />
      <navigation-create-resource-button
        v-if="$auth.hasScope('ROLE_EDITOR')"
        resource-base-path="/app/stratigraphic_units"
        :disabled="false"
      />
    </v-toolbar>
    <v-data-table
      multi-sort
      dense
      :headers="[
      {
        text: 'id',
        value: 'id',
        align: 'center'
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
      <template #[`item.id`]="{ item : tItem }">
        <navigation-resource-item-crud
          :item-id="tItem.id" resource-base-path="/app/stratigraphic_units"
          @delete="openDeleteDialog(tItem)"
        />
      </template>
      <template #[`item.site.code`]="{ item }">
        <navigation-resource-item-chip
          :link-text="item.site.code"
          :item-id="item.site.id"
          resource-base-path="/app/sites" />
      </template>
      <template #[`item.area.code`]="{ item }">
        <navigation-resource-item-chip
          :link-text="item.area.code"
          :item-id="item.area.id"
          resource-base-path="/app/areas" />
      </template>
      <template #[`item.date`]="{ item }">
        {{ new Date(item.date).toLocaleDateString() }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import RouteResourceCollectionTableMixin from "@/mixins/RouteResourceCollectionTableMixin";
import NavigationCreateResourceButton from "@/components/NavigationCreateResourceButton";
import NavigationResourceItemCrud from "@/components/NavigationResourceItemCrud";
import NavigationResourceItemChip from "@/components/NavigationResourceItemChip";

export default {
  name: "CollectionSusCard",
  components: {
    NavigationCreateResourceButton,
    NavigationResourceItemChip,
    NavigationResourceItemCrud
  },
  mixins: [
    RouteResourceCollectionTableMixin
  ],
}
</script>

<style scoped>

</style>
