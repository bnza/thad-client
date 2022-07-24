<template>
  <v-card data-cy="collection-potteries-card">
    <v-toolbar flat dense>
      <v-toolbar-title v-if="!isChild">Pottery</v-toolbar-title>
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
        text: 'period',
        value: 'period.code',
        width: '130px'
      },
      {
        text: 'subperiod',
        value: 'subperiod.code',
        width: '130px'
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
        text: 'decorations',
        value: 'decorations',
        sortable: false,
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
        text: 'notes',
        value: 'notes',
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
      <template #[`item.period.code`]="{ item }">
        {{ getVocabularValue('period', item.period, 'code') }}
      </template>
      <template #[`item.subperiod.code`]="{ item }">
        {{ getVocabularValue('subperiod', item.subperiod, 'code') }}
      </template>
      <template #[`item.ware.value`]="{ item }">
        {{ getVocabularValue('ware', item.ware) }}
      </template>
      <template #[`item.fabric.value`]="{ item }">
        {{ getVocabularValue('fabric', item.fabric) }}
      </template>
      <template #[`item.preservation.value`]="{ item }">
        {{ getVocabularValue('preservation', item.preservation) }}
      </template>
      <template #[`item.externalSurfaceColour.value`]="{ item }">
        {{ getVocabularValue('potteryColour', item.externalSurfaceColour) }}
      </template>
      <template #[`item.internalSurfaceColour.value`]="{ item }">
        {{ getVocabularValue('potteryColour', item.internalSurfaceColour) }}
      </template>
      <template #[`item.fractureColour.value`]="{ item }">
        {{ getVocabularValue('potteryColour', item.fractureColour) }}
      </template>
      <template #[`item.surfaceCharacteristic.value`]="{ item }">
        {{ getVocabularValue('surfaceCharacteristic', item.surfaceCharacteristic) }}
      </template>
      <template #[`item.surfaceTreatment.value`]="{ item }">
        {{ getVocabularValue('surfaceTreatment', item.surfaceTreatment) }}
      </template>
      <template #[`item.manufacturingTechnique.value`]="{ item }">
        {{ getVocabularValue('manufacturingTechnique', item.manufacturingTechnique) }}
      </template>
      <template #[`item.firing.value`]="{ item }">
        {{ getVocabularValue('firing', item.firing) }}
      </template>
      <template #[`item.vesselShape.value`]="{ item }">
        {{ getVocabularValue('vesselShape', item.vesselShape) }}
      </template>
      <template #[`item.baseShape.value`]="{ item }">
        {{ getVocabularValue('baseShape', item.baseShape) }}
      </template>
      <template #[`item.rimShape.value`]="{ item }">
        {{ getVocabularValue('rimShape', item.rimShape) }}
      </template>
      <template #[`item.neck.value`]="{ item }">
        {{ getVocabularValue('neck', item.neck) }}
      </template>
      <template #[`item.neckLength.value`]="{ item }">
        {{ getVocabularValue('neckLength', item.neckLength) }}
      </template>
      <template #[`item.body.value`]="{ item }">
        {{ getVocabularValue('body', item.body) }}
      </template>
      <template #[`item.spout.value`]="{ item }">
        {{ getVocabularValue('spout', item.spout) }}
      </template>
      <template #[`item.handle.value`]="{ item }">
        {{ getVocabularValue('handle', item.handle) }}
      </template>
      <template #[`item.sizeGroup.value`]="{ item }">
        {{ getVocabularValue('sizeGroup', item.sizeGroup) }}
      </template>
      <template #[`item.date`]="{ item }">
        {{ new Date(item.date).toLocaleDateString() }}
      </template>
      <template #[`item.decorations`]="{ item }">
        <long-text-table-data-tooltip v-if="Array.isArray(item.decorations)" :text="item.decorations.map(item => item.decoration.value).join(', ')" />
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
import FilterCollectionDialog from "@/components/filters/FilterCollectionDialog";
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import ResourceCollectionGetMixin from "@/mixins/ResourceCollectionGetMixin";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";

export default {
  name: "CollectionPotteriesCard",
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
