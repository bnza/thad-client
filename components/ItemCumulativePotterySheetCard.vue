<template>
  <v-card data-cy="item-cumulative-pottery-ware-card">
    <v-toolbar flat>
      <navigation-prev-button />
      <v-toolbar-title>Cumulative Pottery Sheet</v-toolbar-title>
      <v-spacer />
      <v-toolbar-title v-if="ready"><strong class="secondary--text">{{formatCode(resourceName, item)}}</strong></v-toolbar-title>
      <v-spacer />
      <navigation-collection-resource-button :resource-name="resourceName" />
      <navigation-update-resource-button :item-id="id" :resource-name="resourceName" :disabled="!$auth.hasScope('ROLE_EDITOR')" />
      <navigation-delete-resource-button
        :item-id="id"
        :resource-name="resourceName"
        :disabled="!$auth.hasScope('ROLE_EDITOR')"
        @delete="openDeleteDialog(item)"
      />
      <template #extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tab href="#ware">Ware</v-tab>
          <v-tab href="#periods">Periods</v-tab>
          <v-tab href="#su">SU</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-row v-if="ready && tab!=='su'" dense class="px-6 pt-6">
      <v-col sm="3">
        <v-text-field
          class="secondary--text font-weight-bold" color="secondary"
          :value="formatCode('cumulativePotterySheet', item)"
          label="code"
          readonly
        />
      </v-col>
      <v-col sm="3">
        <v-text-field
          :value="formatCode('stratigraphicUnit', item.stratigraphicUnit)"
          label="SU"
          readonly
        />
      </v-col>
      <v-col />
    </v-row>
    <v-tabs-items v-model="tab">
      <v-tab-item value="ware">
        <read-cumulative-pottery-sheet-ware-card v-if="ready" :item="item" />
      </v-tab-item>
      <v-tab-item value="periods">
        <read-cumulative-pottery-sheet-period-card v-if="ready" :item="item" />
      </v-tab-item>
      <v-tab-item value="su">
        <resource-fetch-item v-if="item.stratigraphicUnit" :item-id="`${item.stratigraphicUnit.id}`" resource-name="stratigraphicUnit">
          <template #default="su">
            <read-su-card v-if="su.item.id" :item="su.item" :is-child="true"/>
          </template>
        </resource-fetch-item>
      </v-tab-item>
    </v-tabs-items>
    <read-cumulative-pottery-sheet-common-card v-if="ready && tab!=='su'" class="px-6" :item="item"/>
    <delete-resource-dialog
      v-if="deletingItem"
      :resource-name="resourceName"
      :visible.sync="deleteDialog"
      :item="deletingItem"
      @itemDeleted="resetAndPrev"
    >
      <delete-cumulative-pottery-sheet-card-text :item="deletingItem" />
    </delete-resource-dialog>
  </v-card>
</template>

<script>
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import RouteTabbedComponentMixin from "@/mixins/RouteTabbedComponentMixin";
import ResourceItemGetMixin from "@/mixins/ResourceItemGetMixin";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";

export default {
  name: "ItemCumulativePotterySheetCard",
  mixins: [
    ResourceItemDataAccessorMixin,
    ResourceItemGetMixin,
    ResourceDeleteDialogMixin,
    ResourceItemGetMixin,
    RouteTabbedComponentMixin
  ]
}
</script>

<style scoped>

</style>
