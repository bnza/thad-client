<template>
  <v-card>
    <v-toolbar flat dense>
      <v-toolbar-title v-if="!isChild">Stratigraphic units</v-toolbar-title>
      <v-toolbar-title v-if="isFiltered" class="secondary--text mx-4"> (filtered) </v-toolbar-title>
      <v-spacer />
      <navigation-download-collection-button :disabled="!totalItems" @click="downloadDialog = true"/>
      <navigation-filter-collection-button @click="filterDialog = true"/>
      <navigation-create-resource-button
        v-if="$auth.hasScope('ROLE_EDITOR')"
        :parent="parent"
        :resource-name="resourceName"
        :disabled="false"
      />
    </v-toolbar>
    <v-data-table
      height="100%"
      fixed-header
      multi-sort
      dense
      :headers="[
      {
        text: 'id',
        value: 'id',
        align: 'center',
        width: '200px'
      },
      {
        text: 'site',
        value: 'site.code',
        align: 'center',
        width: '100px'
      },
      {
        text: 'area',
        value: 'area.code',
        align: 'center',
        width: '100px'
      },
      {
        text: 'number',
        value: 'number',
        width: '100px'
      },
      {
        text: 'type',
        value: 'type.value',
        width: '100px'
      },
      {
        text: 'preservation',
        value: 'preservationState.value',
        width: '130px'
      },
      {
        text: 'top elev. (m)',
        value: 'topElevation',
        width: '150px'
      },
      {
        text: 'bottom elev. (m)',
        value: 'bottomElevation',
        width: '170px'
      },
      {
        text: 'supervisor',
        value: 'areaSupervisor',
        width: '120px'
      },
      {
        text: 'compiler',
        value: 'compiler',
        width: '200px'
      },
      {
        text: 'summary',
        value: 'summary',
        width: '200px'
      },
      {
        text: 'description',
        value: 'description',
        width: '200px'
      },
      {
        text: 'interpretation',
        value: 'interpretation',
        width: '200px'
      },
      {
        text: 'date',
        value: 'date',
        width: '100px'
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
          :resource-name="resourceName"
          @delete="openDeleteDialog(tItem)"
        />
      </template>
      <template #[`item.site.code`]="{ item }">
        <navigation-resource-item-chip
          :link-text="item.site.code"
          :item-id="item.site.id"
          resource-name="site" />
      </template>
      <template #[`item.area.code`]="{ item }">
        <navigation-resource-item-chip
          :link-text="item.area.code"
          :item-id="item.area.id"
          resource-name="area"
        />
      </template>
      <template #[`item.date`]="{ item }">
        {{ new Date(item.date).toLocaleDateString() }}
      </template>
      <template #[`item.description`]="{ item }">
        <long-text-table-data-tooltip :text="item.description" />
      </template>
      <template #[`item.summary`]="{ item }">
        <long-text-table-data-tooltip :text="item.summary" />
      </template>
      <template #[`item.interpretation`]="{ item }">
        <long-text-table-data-tooltip :text="item.interpretation" />
      </template>
    </v-data-table>
    <filter-collection-dialog
      v-if="responseData['hydra:search']"
      resource-name="stratigraphicUnit"
      :visible.sync="filterDialog"
      :hydra-search="responseData['hydra:search']"
      :filters.sync="filters"
    />
    <download-collection-dialog
      :downloading="downloading"
      :visible.sync="downloadDialog"
      :resource-name="resourceName"
      :total-items="totalItems"
      @download="downloadCsv"
    />
    <delete-resource-dialog
      v-if="deletingItem"
      :resource-name="resourceName"
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
import FilterCollectionDialog from "@/components/FilterCollectionDialog";
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import ResourceCollectionGetMixin from "@/mixins/ResourceCollectionGetMixin";
import NavigationCreateResourceButton from "@/components/NavigationCreateResourceButton";
import NavigationResourceItemCrud from "@/components/NavigationResourceItemCrud";
import NavigationResourceItemChip from "@/components/NavigationResourceItemChip";
import LongTextTableDataTooltip from "@/components/LongTextTableDataTooltip";

export default {
  name: "CollectionSusCard",
  components: {
    DeleteSuCardText,
    DeleteResourceDialog,
    FilterCollectionDialog,
    LongTextTableDataTooltip,
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
