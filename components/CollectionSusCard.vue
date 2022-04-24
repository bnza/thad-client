<template>
  <v-card>
    <v-toolbar flat dense>
      <v-toolbar-title v-if="!isChild">Stratigraphic units</v-toolbar-title>
      <v-spacer />
      <navigation-create-resource-button
        v-if="$auth.hasScope('ROLE_EDITOR')"
        resource-name="stratigraphic_units"
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
          scope="ROLE_EDITOR"
          :item-id="tItem.id"
          resource-name="stratigraphic_units"
          @delete="openDeleteDialog(tItem)"
        />
      </template>
      <template #[`item.site.code`]="{ item }">
        <navigation-resource-item-chip
          :link-text="item.site.code"
          :item-id="item.site.id"
          resource-name="sites" />
      </template>
      <template #[`item.area.code`]="{ item }">
        <navigation-resource-item-chip
          :link-text="item.area.code"
          :item-id="item.area.id"
          resource-name="areas" />
      </template>
      <template #[`item.date`]="{ item }">
        {{ new Date(item.date).toLocaleDateString() }}
      </template>
    </v-data-table>
    <delete-resource-dialog
      v-if="deletingItem"
      resource-name="stratigraphic_units"
      :visible.sync="deleteDialog"
      :item="deletingItem"
      @itemDeleted="resetAndFetch"
    >
      <delete-su-card-text :item="deletingItem" />
    </delete-resource-dialog>
  </v-card>
</template>

<script>
import DeleteResourceDialog from "@/components/DeleteResourceDialog";
import DeleteSuCardText from "@/components/DeleteSuCardText";
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import ResourceCollectionGetMixin from "@/mixins/ResourceCollectionGetMixin";
import NavigationCreateResourceButton from "@/components/NavigationCreateResourceButton";
import NavigationResourceItemCrud from "@/components/NavigationResourceItemCrud";
import NavigationResourceItemChip from "@/components/NavigationResourceItemChip";

export default {
  name: "CollectionSusCard",
  components: {
    DeleteSuCardText,
    DeleteResourceDialog,
    NavigationCreateResourceButton,
    NavigationResourceItemChip,
    NavigationResourceItemCrud
  },
  mixins: [
    ResourceCollectionGetMixin,
    ResourceDeleteDialogMixin
  ],
}
</script>

<style scoped>

</style>
