<template>
  <v-card data-cy="collection-sus-card">
    <v-toolbar flat dense>
      <v-toolbar-title v-if="!isChild">Stratigraphic units</v-toolbar-title>
      <v-toolbar-title v-if="isFiltered" class="secondary--text mx-4"> (filtered) </v-toolbar-title>
      <v-spacer />
      <navigation-download-collection-button :disabled="!totalItems" @click="downloadDialog = true"/>
      <navigation-filter-collection-button @click="filterDialog = true"/>
      <slot name="create-action">
        <navigation-create-resource-button
          v-if="$auth.hasScope('ROLE_EDITOR')"
          :parent="parent"
          :resource-name="resourceName"
          :disabled="false"
        />
      </slot>
    </v-toolbar>
    <v-data-table
      height="100%"
      fixed-header
      multi-sort
      :items-per-page="10"
      :footer-props="{
        disableItemsPerPage: true
      }"
      dense
      :headers="[
      {
        text: 'id',
        value: 'id',
        align: 'center fixed',
        width: '150px'
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
        text: 'year',
        value: 'year',
        width: '100px'
      },
      {
        text: 'number',
        value: 'number',
        width: '100px'
      },
      {
        text: 'building',
        value: 'building',
        width: '100px'
      },
      {
        text: 'room',
        value: 'room',
        width: '100px'
      },
      {
        text: 'phase',
        value: 'phase',
        width: '100px'
      },
      {
        text: 'period',
        value: 'period.code',
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
        >
          <div class="secondary--text">{{formatCode(resourceName, tItem)}}</div>
        </navigation-resource-item-crud>
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
    <slot name="delete-dialog" v-bind="{deletingItem, visible: deleteDialog, events: {closeDeleteDialog}}">
      <delete-resource-dialog
        v-if="deletingItem"
        :resource-name="resourceName"
        :visible.sync="deleteDialog"
        :item="deletingItem"
        @itemDeleted="resetAndFetch"
      >
        <delete-su-card-text :item="deletingItem" />
      </delete-resource-dialog>
    </slot>
  </v-card>
</template>

<script>
import DeleteResourceDialog from "@/components/DeleteResourceDialog";
import DeleteSuCardText from "@/components/DeleteSuCardText";
import FilterCollectionDialog from "@/components/FilterCollectionDialog";
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import ResourceCollectionGetMixin from "@/mixins/ResourceCollectionGetMixin";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
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
    ResourceDeleteDialogMixin,
    ResourceItemDataAccessorMixin
  ],
}
</script>

<style>
table > tbody > tr > td.fixed,
table > thead > tr > th.fixed {
  position: sticky !important;
  position: -webkit-sticky !important;
  left: 0;
  z-index: 98;
  background: rgba(30,30,30);
  -webkit-box-shadow: -1px 0 3px -1px rgba(0, 0, 0, 0.19);
  -moz-box-shadow: -1px 0 3px -1px rgba(0, 0, 0, 0.19);
  box-shadow: -1px 0 3px -1px rgba(0, 0, 0, 0.19);
}

table > thead > tr > th.fixed {
  z-index: 99 !important;
}
</style>
