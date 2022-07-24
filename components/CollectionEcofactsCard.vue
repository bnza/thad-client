<template>
  <v-card data-cy="collection-ecofacts-card">
    <v-toolbar flat dense>
      <v-toolbar-title v-if="!isChild">Ecofacts</v-toolbar-title>
      <search-app-id-text-field :filter.sync="codeFilter"/>
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
      :loading="$fetchState.pending"
      :items-per-page="10"
      :footer-props="{
        disableItemsPerPage: true
      }"
      dense
      :headers="[
      {
        text: 'action',
        value: 'appId.code',
        align: 'center fixed',
        width: '150px',
      },
      {
        text: 'site',
        value: 'stratigraphicUnit.site.code',
        align: 'center',
        width: '100px'
      },
      {
        text: 'area',
        value: 'stratigraphicUnit.area.code',
        align: 'center',
        width: '100px'
      },
      {
        text: 'SU',
        value: 'stratigraphicUnit.number',
        align: 'center',
        width: '100px'
      },
      {
        text: 'number',
        value: 'number',
        width: '100px'
      },
      {
        text: 'quantity',
        value: 'quantity',
        width: '150px'
      },
      {
        text: 'type',
        value: 'type.value',
        width: '150px'
      },
      {
        text: 'preservation',
        value: 'preservationState.value',
        width: '170px'
      },
      {
        text: 'analyzed',
        value: 'selectedForAnalysis',
        width: '170px'
      },
      {
        text: 'length (cm)',
        value: 'length',
        width: '150px'
      },
      {
        text: 'width (cm)',
        value: 'width',
        width: '150px'
      },
      {
        text: 'height (cm)',
        value: 'height',
        width: '150px'
      },
      {
        text: 'thickness (cm)',
        value: 'thickness',
        width: '150px'
      },
      {
        text: 'min diam. (cm)',
        value: 'minDiameter',
        width: '150px'
      },
      {
        text: 'max diam. (cm)',
        value: 'maxDiameter',
        width: '150px'
      },
      {
        text: 'compiler',
        value: 'compiler',
        width: '200px'
      },
      {
        text: 'notes',
        value: 'notes',
        width: '200px'
      },
      {
        text: 'collection date',
        value: 'collectionDate',
        width: '150px'
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
      <template #[`item.appId.code`]="{ item : tItem }">
        <navigation-resource-item-crud
          scope="ROLE_EDITOR"
          :item-id="tItem.id"
          :resource-name="resourceName"
          @delete="openDeleteDialog(tItem)"
        >
          <div class="secondary--text">{{formatCode(resourceName, tItem)}}</div>
        </navigation-resource-item-crud>
      </template>
      <template #[`item.stratigraphicUnit.site.code`]="{ item }">
        <navigation-resource-item-chip
          :link-text="item.stratigraphicUnit.site.code"
          :item-id="item.stratigraphicUnit.site.id"
          resource-name="site" />
      </template>
      <template #[`item.stratigraphicUnit.area.code`]="{ item }">
        <navigation-resource-item-chip
          :link-text="item.stratigraphicUnit.area.code"
          :item-id="item.stratigraphicUnit.area.id"
          resource-name="area"
        />
      </template>
      <template #[`item.stratigraphicUnit.number`]="{ item }">
        <navigation-resource-item-chip
          :link-text="item.stratigraphicUnit.appId.code"
          :item-id="item.stratigraphicUnit.id"
          resource-name="stratigraphicUnit"
        />
      </template>
      <template #[`item.selectedForAnalysis`]="{ item : tItem }">
        <v-simple-checkbox :value="tItem.selectedForAnalysis" :ripple="false"/>
      </template>
      <template #[`item.collectionDate`]="{ item }">
        {{ item.collectionDate ? new Date(item.collectionDate).toLocaleDateString() : undefined}}
      </template>
      <template #[`item.date`]="{ item }">
        {{ new Date(item.date).toLocaleDateString() }}
      </template>
      <template #[`item.notes`]="{ item }">
        <long-text-table-data-tooltip :text="item.notes" />
      </template>
    </v-data-table>
    <filter-collection-dialog
      v-if="responseData['hydra:search']"
      :resource-name="resourceName"
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
      <delete-ecofact-card-text :item="deletingItem" />
    </delete-resource-dialog>
  </v-card>
</template>

<script>
import FilterCollectionDialog from "@/components/filters/FilterCollectionDialog";
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import ResourceCollectionGetMixin from "@/mixins/ResourceCollectionGetMixin";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";

export default {
  name: "CollectionEcofactsCard",
  components: {
    FilterCollectionDialog,
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
