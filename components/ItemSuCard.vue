<template>
  <v-card data-cy="item-su-card" flat>
    <v-toolbar flat dense>
      <navigation-prev-button />
      <v-toolbar-title class="text-capitalize">{{resource.itemLabel}}</v-toolbar-title>
      <v-spacer />
      <v-toolbar-title v-if="ready"><strong class="secondary--text">{{formatCode('stratigraphicUnit', item)}}</strong></v-toolbar-title>
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
          <v-tab href="#data">Data</v-tab>
          <v-tab href="#rels" data-cy="tab-rels">Relationships</v-tab>
          <v-tab href="#pottery">Pottery</v-tab>
          <v-tab href="#c_pottery">Cumulative pottery</v-tab>
          <v-tab href="#finds">Small finds</v-tab>
          <v-tab href="#sample">Samples</v-tab>
          <v-tab href="#eco">Ecofacts</v-tab>
          <v-tab href="#images" data-cy="tab-images">Images</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item value="data">
        <read-su-card v-if="ready" :item="item" />
      </v-tab-item>
      <v-tab-item value="rels">
        <v-container>
          <v-row data-cy="collection-su-seq-row">
            <p class="ms-4 text-overline">Sequence Relationships</p>
            <lazy-collection-su-seq-container :parent="item" resource-name="stratigraphicSequence"/>
          </v-row>
          <v-row data-cy="collection-su-st-row">
            <p class="ms-4 text-overline">Stratigraphic Relationships</p>
            <lazy-collection-su-rels-container :parent="item" resource-name="stratigraphicRelationship"/>
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item value="pottery">
        <collection-potteries-card
          v-if="ready"
          tab="pottery"
          :parent="item"
          parent-request-filter-key="stratigraphicUnit.id"
          resource-name="pottery"
        />
      </v-tab-item>
      <v-tab-item value="c_pottery">
        <resource-fetch-item v-if="item.cumulativePotterySheet" :item-id="`${item.cumulativePotterySheet.id}`" resource-name="cumulativePotterySheet">
          <template #default="cps">
            <lazy-read-cumulative-pottery-sheet-card v-if="cps.ready" :item="cps.item" :parent="item" @deleted="$fetch()"/>
          </template>
        </resource-fetch-item>
        <lazy-read-cumulative-pottery-sheet-card v-else :item="{}" :parent="item"/>
      </v-tab-item>
      <v-tab-item value="finds">
        <collection-small-finds-card
          v-if="ready"
          tab="finds"
          :parent="item"
          parent-request-filter-key="stratigraphicUnit.id"
          resource-name="smallFind"
        />
      </v-tab-item>
      <v-tab-item value="eco">
        <collection-ecofacts-card
          v-if="ready"
          tab="eco"
          :parent="item"
          parent-request-filter-key="stratigraphicUnit.id"
          resource-name="ecofact"
        />
      </v-tab-item>
      <v-tab-item value="sample">
        <collection-samples-card
          v-if="ready"
          tab="sample"
          :parent="item"
          parent-request-filter-key="stratigraphicUnit.id"
          resource-name="sample"
        />
      </v-tab-item>
      <v-tab-item value="images" data-cy="tab-item-images">
        <collection-media-objects-card
          v-if="ready"
          tab="images"
          :parent="item"
          :enable-pagination="false"
          parent-request-filter-key="stratigraphicUnit.id"
          resource-name="mediaObjectStratigraphicUnit"
          parent-request-key="stratigraphicUnit"
          @created="$fetch"
        >
          <delete-su-card-text :item="item" />
        </collection-media-objects-card>
      </v-tab-item>
    </v-tabs-items>
    <delete-resource-dialog
      v-if="deletingItem"
      :resource-name="resourceName"
      :visible.sync="deleteDialog"
      :item="deletingItem"
      @itemDeleted="resetAndPrev"
    >
      <delete-su-card-text :item="deletingItem" />
    </delete-resource-dialog>
  </v-card>
</template>

<script>
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import ResourceItemGetMixin from "@/mixins/ResourceItemGetMixin";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
import RouteTabbedComponentMixin from "@/mixins/RouteTabbedComponentMixin";

export default {
  name: "ItemSuCard",
  mixins: [
    ResourceItemGetMixin,
    ResourceItemDataAccessorMixin,
    ResourceDeleteDialogMixin,
    RouteTabbedComponentMixin
  ],
}
</script>

<style scoped>

</style>
