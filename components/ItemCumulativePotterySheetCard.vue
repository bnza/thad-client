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
            <read-su-card v-if="su.item.id" :item="su.item" />
          </template>
        </resource-fetch-item>
      </v-tab-item>
    </v-tabs-items>
    <div v-if="ready && tab!=='su'" class="px-6" >
      <v-row dense>
      <v-col>
        <v-textarea
          :value="getResponseValue('notes', item)"
          label="note"
          readonly
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          :value="getResponseValue('compiler', item)"
          label="compiler"
          readonly
        />
      </v-col>
      <v-col>
        <v-text-field
          :value="getResponseValue('date', item).substring(0,10)"
          label="date"
          readonly
        />
      </v-col>
    </v-row>
    </div>
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
