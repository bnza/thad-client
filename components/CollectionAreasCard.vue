<template>
  <v-card>
    <v-toolbar flat dense>
      <v-toolbar-title v-if="!isChild">Areas</v-toolbar-title>
      <v-spacer />
      <navigation-create-resource-button
        v-if="$auth.hasScope('ROLE_ADMIN')"
        resource-base-url="/app/areas/"
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
          :item-id="tItem.id" resource-base-url="/app/areas/"
          @delete="openDeleteDialog(tItem)"
        />
      </template>
      <template #[`item.code`]="{ item : tItem }">
        <navigation-resource-item-chip
          :link-text="tItem.code"
          :item-id="tItem.id"
          resource-base-url="/app/areas/" />
      </template>
      <template #[`item.site.code`]="{ item : tItem }">
        <navigation-resource-item-chip
          :link-text="tItem.site.code"
          :item-id="tItem.site.id"
          resource-base-url="/app/sites/" />
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
  name: "CollectionsAreaCard",
  components: {
    NavigationCreateResourceButton,
    NavigationResourceItemChip,
    NavigationResourceItemCrud
  },
  mixins: [
    RouteResourceCollectionTableMixin
  ],
  computed: {
    resourceName() {
      return 'areas'
    }
  },
}
</script>

<style scoped>

</style>
