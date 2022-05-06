<template>
  <v-card data-cy="collection-potteries-card">
    <v-toolbar flat dense>
      <v-toolbar-title v-if="!isChild">Potteries</v-toolbar-title>
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
        width: '100px'
      },
      {
        text: 'number',
        value: 'number',
        width: '100px'
      },
      {
        text: 'ware',
        value: 'ware.value',
        width: '130px'
      },
      {
        text: 'fabric',
        value: 'fabric.value',
        width: '170px'
      },
      {
        text: 'preservation',
        value: 'preservation.value',
        width: '170px'
      },
      {
        text: 'ext. surface colour',
        value: 'externalSurfaceColour.value',
        width: '190px'
      },
      {
        text: 'int. surface colour',
        value: 'internalSurfaceColour.value',
        width: '190px'
      },
      {
        text: 'fracture colour',
        value: 'fractureColour.value',
        width: '150px'
      },
      {
        text: 'surf. characteristic',
        value: 'surfaceCharacteristic.value',
        width: '180px'
      },
      {
        text: 'surf. treatment',
        value: 'surfaceTreatment.value',
        width: '150px'
      },
      {
        text: 'manufacturing tech.',
        value: 'manufacturingTechnique.value',
        width: '200px'
      },
      {
        text: 'firing',
        value: 'firing.value',
        width: '150px'
      },
      {
        text: 'decoration',
        value: 'decoration.value',
        width: '150px'
      },
      {
        text: 'vessel shape',
        value: 'vesselShape.value',
        width: '150px'
      },
      {
        text: 'base shape',
        value: 'baseShape.value',
        width: '150px'
      },
      {
        text: 'rim shape',
        value: 'rimShape.value',
        width: '150px'
      },
      {
        text: 'neck',
        value: 'neck.value',
        width: '150px'
      },
      {
        text: 'neck length',
        value: 'neckLength.value',
        width: '150px'
      },
      {
        text: 'body',
        value: 'body.value',
        width: '150px'
      },
      {
        text: 'spout',
        value: 'spout.value',
        width: '150px'
      },
      {
        text: 'handle',
        value: 'handle.value',
        width: '150px'
      },
      {
        text: 'size group',
        value: 'sizeGroup.value',
        width: '150px'
      },
      {
        text: 'decoration',
        value: 'decoration.value',
        width: '150px'
      },
      {
        text: 'thickness (cm)',
        value: 'thickness',
        width: '150px'
      },
      {
        text: 'rim diam. (cm)',
        value: 'rimDiameter',
        width: '150px'
      },
      {
        text: 'base diam. (cm)',
        value: 'baseDiameter',
        width: '150px'
      },
      {
        text: 'compiler',
        value: 'compiler',
        width: '200px'
      },
      {
        text: 'note',
        value: 'note',
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
          :link-text="`${item.stratigraphicUnit.number}`"
          :item-id="item.stratigraphicUnit.id"
          resource-name="stratigraphicUnit"
        />
      </template>
      <template #[`item.date`]="{ item }">
        {{ new Date(item.date).toLocaleDateString() }}
      </template>
      <template #[`item.note`]="{ item }">
        <long-text-table-data-tooltip :text="item.note" />
      </template>
    </v-data-table>
    <filter-collection-dialog
      v-if="responseData['hydra:search']"
      resource-name="pottery"
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
      <delete-pottery-card-text :item="deletingItem" />
    </delete-resource-dialog>
  </v-card>
</template>

<script>
import DeleteResourceDialog from "@/components/DeleteResourceDialog";
import FilterCollectionDialog from "@/components/FilterCollectionDialog";
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import ResourceCollectionGetMixin from "@/mixins/ResourceCollectionGetMixin";
import NavigationCreateResourceButton from "@/components/NavigationCreateResourceButton";
import NavigationResourceItemCrud from "@/components/NavigationResourceItemCrud";
import NavigationResourceItemChip from "@/components/NavigationResourceItemChip";
import LongTextTableDataTooltip from "@/components/LongTextTableDataTooltip";

export default {
  name: "CollectionPotteriesCard",
  components: {
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
