<template>
  <v-card data-cy="item-area-card">
    <v-toolbar flat>
      <navigation-prev-button />
      <v-toolbar-title>Area</v-toolbar-title>
      <v-spacer />
      <v-toolbar-title v-if="ready"><strong class="secondary--text">{{formatCode(resourceName, item)}}</strong></v-toolbar-title>
      <v-spacer />
      <navigation-collection-resource-button :resource-name="resourceName" />
      <navigation-update-resource-button
        :item-id="id"
        :resource-name="resourceName"
        :disabled="!ready || !$auth.hasScope('ROLE_ADMIN')"
      />
      <navigation-delete-resource-button
        :item-id="id"
        :resource-name="resourceName"
        :disabled="!$auth.hasScope('ROLE_ADMIN')"
        @delete="openDeleteDialog(item)"
      />
      <template #extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tab href="#data">Data</v-tab>
          <v-tab href="#sus">stratigraphic units</v-tab>
          <v-tab href="#graves">graves</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item value="data">
        <read-area-card v-if="ready" :item="item" />
      </v-tab-item>
      <v-tab-item value="sus">
        <collection-sus-card
          v-if="ready"
          resource-name="stratigraphicUnit"
          tab="sus"
          :parent="item"
          parent-request-filter-key="area.id"
        />
      </v-tab-item>
      <v-tab-item value="graves">
        <lazy-collection-graves-card
          v-if="ready"
          resource-name="grave"
          tab="graves"
          :parent="item"
          parent-request-filter-key="area.id"
        />
      </v-tab-item>
    </v-tabs-items>
    <delete-resource-dialog
      v-if="deletingItem"
      :resource-name="resourceName"
      :visible.sync="deleteDialog"
      :item="deletingItem"
      @itemDeleted="resetAndPrev"
    >
      <delete-area-card-text :item="deletingItem" />
    </delete-resource-dialog>
  </v-card>
</template>

<script>
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import ResourceItemGetMixin from "@/mixins/ResourceItemGetMixin";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
import RouteTabbedComponentMixin from "@/mixins/RouteTabbedComponentMixin";
import NavigationPrevButton from "@/components/NavigationPrevButton";
import ReadAreaCard from "@/components/ReadAreaCard";
import NavigationCollectionResourceButton from "@/components/NavigationCollectionResourceButton";
import NavigationDeleteResourceButton from "@/components/NavigationDeleteResourceButton";
import NavigationUpdateResourceButton from "@/components/NavigationUpdateResourceButton";
import CollectionSusCard from "@/components/CollectionSusCard";
import DeleteResourceDialog from "@/components/DeleteResourceDialog";
import DeleteAreaCardText from "@/components/DeleteAreaCardText";

export default {
  name: "ItemAreaCard",
  components: {
    ReadAreaCard,
    CollectionSusCard,
    DeleteResourceDialog,
    DeleteAreaCardText,
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
