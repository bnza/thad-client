<template>
  <v-card data-cy="item-site-card">
    <v-toolbar flat>
      <navigation-prev-button />
      <v-toolbar-title>Site</v-toolbar-title>
      <v-spacer />
      <v-toolbar-title v-if="item"><strong class="secondary--text">{{item.code}}</strong></v-toolbar-title>
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
        :disabled="!ready || !$auth.hasScope('ROLE_ADMIN')"
        @delete="openDeleteDialog(item)"
      />
      <template #extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tab href="#data">Data</v-tab>
          <v-tab href="#areas">Areas</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item value="data">
        <read-site-card v-if="item" :item="item" />
      </v-tab-item>
      <v-tab-item value="areas">
        <collection-areas-card
          v-if="ready"
          tab="areas"
          :parent="item"
          parent-request-filter-key="site.id"
          resource-name="area"
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
      <delete-site-card-text :item="deletingItem" />
    </delete-resource-dialog>
  </v-card>
</template>

<script>
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import RouteTabbedComponentMixin from "@/mixins/RouteTabbedComponentMixin";
import NavigationPrevButton from "@/components/NavigationPrevButton";
import ReadSiteCard from "@/components/ReadSiteCard";
import NavigationCollectionResourceButton from "@/components/NavigationCollectionResourceButton";
import NavigationDeleteResourceButton from "@/components/NavigationDeleteResourceButton";
import NavigationUpdateResourceButton from "@/components/NavigationUpdateResourceButton";
import CollectionAreasCard from "@/components/CollectionAreasCard";
import DeleteResourceDialog from "@/components/DeleteResourceDialog";
import DeleteSiteCardText from "@/components/DeleteSiteCardText";
import ResourceItemGetMixin from "@/mixins/ResourceItemGetMixin";

export default {
  name: "ItemSiteCard",
  components: {
    ReadSiteCard,
    CollectionAreasCard,
    DeleteResourceDialog,
    DeleteSiteCardText,
    NavigationPrevButton,
    NavigationCollectionResourceButton,
    NavigationDeleteResourceButton,
    NavigationUpdateResourceButton,
  },
  mixins: [
    ResourceItemGetMixin,
    ResourceDeleteDialogMixin,
    ResourceItemGetMixin,
    RouteTabbedComponentMixin
  ]
}
</script>

<style scoped>

</style>
