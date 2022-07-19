<template>
  <v-card data-cy="collection-cps-card">
    <v-toolbar flat dense>
      <v-toolbar-title v-if="!isChild">Cumulative pottery sheets</v-toolbar-title>
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
      :headers="headers"
      :items="items"
      :options.sync="pagination"
      :server-items-length="totalItems"
    >
      <template v-for="h in headers" #[`header.${h.value}`]="{ header }">
        <v-tooltip :key="h.value" bottom>
          <template #activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">{{header.text}}</span>
          </template>
          <span>{{header.label || header.text}}</span>
        </v-tooltip>
      </template>

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
      <template #[`item.cumulativeWareCount`]="{ item }">
        <span class="font-weight-black">{{item.cumulativeWareCount}}</span>
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
      <delete-cumulative-pottery-sheet-card-text :item="deletingItem" />
    </delete-resource-dialog>
  </v-card>
</template>

<script>
import FilterCollectionDialog from "@/components/filters/FilterCollectionDialog";
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import ResourceCollectionGetMixin from "@/mixins/ResourceCollectionGetMixin";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";

export default {
  name: "CollectionCumulativePotterySheetsCard",
  components: {
    FilterCollectionDialog,
  },
  mixins: [
    ResourceCollectionGetMixin,
    ResourceDeleteDialogMixin,
    ResourceItemDataAccessorMixin
  ],
  computed: {
    headers: () => [
      {
        text: 'action',
        value: 'id',
        align: 'center fixed',
        width: '150px',
        sortable: false
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
        text: 'total',
        value: 'cumulativeWareCount',
        label: 'cumulative sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'CW-ND',
        value: 'commonWareNonDiagnosticCount',
        label: 'common ware non diagnostic sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'CW-D',
        value: 'commonWareDiagnosticCount',
        label: 'common ware diagnostic sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'FW-ND',
        value: 'fineWareNonDiagnosticCount',
        label: 'fine ware non diagnostic sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'FW-D',
        value: 'fineWareDiagnosticCount',
        label: 'fine ware diagnostic sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'CoaW-ND',
        value: 'coarseWareNonDiagnosticCount',
        label: 'coarse ware non diagnostic sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'CoaW-D',
        value: 'coarseWareDiagnosticCount',
        label: 'coarse ware diagnostic sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'KW-D',
        value: 'kitchenWareDiagnosticCount',
        label: 'kitchen ware diagnostic sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'KW-ND',
        value: 'kitchenWareNonDiagnosticCount',
        label: 'kitchen ware non diagnostic sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'sP-EPN',
        value: 'subperiodEPNCount',
        label: 'subperiod Early Pottery Neolithic sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'sP-HAS',
        value: 'subperiodHASCount',
        label: 'subperiod Hassuna sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'sP-SAM',
        value: 'subperiodSAMCount',
        label: 'subperiod Samarra sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'sP-HAL',
        value: 'subperiodHALCount',
        label: 'subperiod Halaf sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'sP-NUB',
        value: 'subperiodNUBCount',
        label: 'subperiod Northern Ubaid sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'sP-LCA',
        value: 'subperiodLCACount',
        label: 'subperiod Late Chalcolithic (generic) sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'sP-LCA1',
        value: 'subperiodLCA1Count',
        label: 'subperiod Late Chalcolithic 1 sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-LCA2',
        value: 'subperiodLCA2Count',
        label: 'subperiod Late Chalcolithic 2 sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-LCA3',
        value: 'subperiodLCA3Count',
        label: 'subperiod Late Chalcolithic 3 sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-LCA4',
        value: 'subperiodLCA4Count',
        label: 'subperiod Late Chalcolithic 4 sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-LCA5',
        value: 'subperiodLCA5Count',
        label: 'subperiod Late Chalcolithic 5 sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-SUR',
        value: 'subperiodSURCount',
        label: 'subperiod Southern Uruk sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'sP-EMT',
        value: 'subperiodEMTCount',
        label: 'subperiod (generic) Early Middle Tigris sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'sP-EMT0',
        value: 'subperiodEMT1Count',
        label: 'subperiod Early Middle Tigris 0 sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-EMT1',
        value: 'subperiodEMT1Count',
        label: 'subperiod Early Middle Tigris 1 sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-EMT2',
        value: 'subperiodEMT2Count',
        label: 'subperiod Early Middle Tigris 2 sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-EMT3',
        value: 'subperiodEMT3Count',
        label: 'subperiod Early Middle Tigris 3 sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-EMT4',
        value: 'subperiodEMT4Count',
        label: 'subperiod Early Middle Tigris 4 sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-EMT5',
        value: 'subperiodEMT5Count',
        label: 'subperiod Early Middle Tigris 5 sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-MBA',
        value: 'subperiodMBACount',
        label: 'subperiod (generic) Middle Bronze Age sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'sP-MBA1',
        value: 'subperiodMBA1Count',
        label: 'subperiod Middle Bronze Age 1 sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-MBA2',
        value: 'subperiodMBA2Count',
        label: 'subperiod Middle Bronze Age 2 sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-LBA1',
        value: 'subperiodLBA1Count',
        label: 'subperiod Late Bronze Age 1 / Mitanni sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-LBA2',
        value: 'subperiodLBA2Count',
        label: 'subperiod Late Bronze Age 2 / Middle Assyrian sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-IRA1',
        value: 'subperiodIRA1Count',
        label: 'subperiod Iron Age 1-2 / Neo Assyrian sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'sP-IRA2',
        value: 'subperiodIRA2Count',
        label: 'subperiod Iron Age 3 / Achaemenid sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-HEL',
        value: 'subperiodHELCount',
        label: 'subperiod Hellenistic sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'sP-PAR',
        value: 'subperiodPARCount',
        label: 'subperiod Parthian sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'sP-BYZ',
        value: 'subperiodBYZCount',
        label: 'subperiod Byzantine sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'sP-SAS',
        value: 'subperiodSASCount',
        label: 'subperiod Sasanian sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'sP-ISL',
        value: 'subperiodISLCount',
        label: 'subperiod (generic) Islamic sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'sP-ISL1',
        value: 'subperiodISL1Count',
        label: 'subperiod Early Islamic sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-ISL2',
        value: 'subperiodISL2Count',
        label: 'subperiod Middle Islamic sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-ISL3',
        value: 'subperiodISL3Count',
        label: 'subperiod Late Islamic sherd count',
        align: 'right',
        width: '120px'
      },
      {
        text: 'sP-UND',
        value: 'subperiodUndeterminedCount',
        label: 'undetermined subperiod sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'P-EPN',
        value: 'periodEPNCount',
        label: 'period Early Pottery Neolithic sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'P-HAS',
        value: 'periodHASCount',
        label: 'period Hassuna sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'P-SAM',
        value: 'periodSAMCount',
        label: 'period Samarra sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'P-HAL',
        value: 'periodHALCount',
        label: 'period Halaf sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'P-NUB',
        value: 'periodNUBCount',
        label: 'period Norther Ubaid sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'P-LCA',
        value: 'periodLCACount',
        label: 'period Late Chalcolithic sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'P-EBA',
        value: 'periodEBACount',
        label: 'period Early Bronze Age sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'P-MBA',
        value: 'periodMBACount',
        label: 'period Middle Bronze Age sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'P-LBA',
        value: 'periodLBACount',
        label: 'period Late Bronze Age sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'P-IRA',
        value: 'periodIRACount',
        label: 'period Iron Age sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'P-HEL',
        value: 'periodHELCount',
        label: 'period Hellenistic sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'P-PAR',
        value: 'periodPARCount',
        label: 'period Parthian sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'P-BYZ',
        value: 'periodBYZCount',
        label: 'period Byzantine sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'P-SAS',
        value: 'periodSASCount',
        label: 'period Sasanian sherd count',
        align: 'right',
        width: '100px'
      },
      {
        text: 'P-ISL',
        value: 'periodISLCount',
        label: 'period Islamic sherd count',
        align: 'right',
        width: '100px'
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
    ]
  }
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
