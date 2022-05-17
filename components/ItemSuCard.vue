<template>
  <v-card data-cy="item-su-card">
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
          <v-tab href="#rels">Relationships</v-tab>
          <v-tab href="#pottery">Pottery</v-tab>
          <v-tab href="#c_pottery">Cumulative pottery</v-tab>
          <v-tab href="#finds">Small finds</v-tab>
          <v-tab href="#eco">Ecofacts</v-tab>
          <v-tab href="#images">Images</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item value="data">
        <read-su-card v-if="ready" :item="item" />
      </v-tab-item>
      <v-tab-item value="rels">
        <collection-su-rels-container :parent="item" resource-name="stratigraphicRelationship"/>
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
        <collection-cumulative-pottery-sheets-card
          v-if="ready"
          tab="c_pottery"
          :parent="item"
          parent-request-filter-key="stratigraphicUnit.id"
          resource-name="cumulativePotterySheet"
        />
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
      <v-tab-item value="images">
        <v-card-text>
          Images
        </v-card-text>
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
import NavigationPrevButton from "@/components/NavigationPrevButton";
import ReadSuCard from "@/components/ReadSuCard";
import NavigationCollectionResourceButton from "@/components/NavigationCollectionResourceButton";
import NavigationDeleteResourceButton from "@/components/NavigationDeleteResourceButton";
import NavigationUpdateResourceButton from "@/components/NavigationUpdateResourceButton";
import CollectionSuRelsContainer from "@/components/CollectionSuRelsContainer";
import CollectionPotteriesCard from "@/components/CollectionPotteriesCard";
import DeleteResourceDialog from "@/components/DeleteResourceDialog";
import DeleteSuCardText from "@/components/DeleteSuCardText";

export default {
  name: "ItemSuCard",
  components: {
    CollectionSuRelsContainer,
    CollectionPotteriesCard,
    ReadSuCard,
    DeleteResourceDialog,
    DeleteSuCardText,
    NavigationPrevButton,
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
