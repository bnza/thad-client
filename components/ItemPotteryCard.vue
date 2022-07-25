<template>
  <v-card
    :loading="$fetchState.pending"
    data-cy="item-pottery-card"
  >
    <v-toolbar flat dense>
      <navigation-prev-button />
      <v-toolbar-title>Pottery</v-toolbar-title>
      <v-spacer />
      <v-toolbar-title v-if="ready"><strong class="secondary--text">{{formatCode(resourceName, item)}}</strong></v-toolbar-title>
      <v-spacer />
      <navigation-collection-resource-button :resource-name="resourceName" />
      <navigation-update-resource-button :item-id="id" :resource-name="resourceName" :disabled="!ready || !$auth.hasScope('ROLE_EDITOR')" />
      <navigation-delete-resource-button
        :item-id="id"
        :resource-name="resourceName"
        :disabled="!ready || !$auth.hasScope('ROLE_EDITOR')"
        @delete="openDeleteDialog(item)"
      />
      <template #extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tab href="#data">Data</v-tab>
          <v-tab href="#su">SU</v-tab>
          <v-tab href="#images">Images</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item value="data">
        <read-pottery-card v-if="ready" :item="item" />
      </v-tab-item>
      <v-tab-item value="su">
       <resource-fetch-item v-if="item.stratigraphicUnit" :item-id="`${item.stratigraphicUnit.id}`" resource-name="stratigraphicUnit">
          <template #default="su">
            <read-su-card v-if="su.item.id" :item="su.item" :is-child="true"/>
          </template>
        </resource-fetch-item>
      </v-tab-item>
      <v-tab-item value="images" data-cy="tab-item-images">
        <collection-media-objects-card
          v-if="ready"
          tab="images"
          :parent="item"
          :enable-pagination="false"
          parent-request-filter-key="pottery.id"
          resource-name="mediaObjectPottery"
          parent-request-key="pottery"
          @created="$fetch"
        >
          <delete-pottery-card-text :item="item" />
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
      <delete-pottery-card-text :item="deletingItem" />
    </delete-resource-dialog>
  </v-card>
</template>

<script>
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import ResourceItemGetMixin from "@/mixins/ResourceItemGetMixin";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
import RouteTabbedComponentMixin from "@/mixins/RouteTabbedComponentMixin";
import NavigationPrevButton from "@/components/NavigationPrevButton";
import ReadPotteryCard from "@/components/ReadPotteryCard";
import NavigationCollectionResourceButton from "@/components/NavigationCollectionResourceButton";
import NavigationDeleteResourceButton from "@/components/NavigationDeleteResourceButton";
import NavigationUpdateResourceButton from "@/components/NavigationUpdateResourceButton";
import ResourceFetchItem from "@/components/ResourceFetchItem";
import DeleteResourceDialog from "@/components/DeleteResourceDialog";

export default {
  name: "ItemPotteryCard",
  components: {
    ReadPotteryCard,
    DeleteResourceDialog,
    NavigationPrevButton,
    ResourceFetchItem,
    NavigationCollectionResourceButton,
    NavigationDeleteResourceButton,
    NavigationUpdateResourceButton,
  },
  mixins: [
    ResourceItemGetMixin,
    ResourceItemDataAccessorMixin,
    ResourceDeleteDialogMixin,
    RouteTabbedComponentMixin
  ]
}
</script>

<style scoped>

</style>
