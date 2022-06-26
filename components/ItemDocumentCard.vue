<template>
  <v-card data-cy="item-document-card">
    <v-toolbar flat dense>
      <navigation-prev-button />
      <v-toolbar-title>Document</v-toolbar-title>
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
          <v-tab href="#rels">Related items</v-tab>
          <!--          <v-tab href="#graves">Graves</v-tab>-->
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item value="data">
        <read-document-card v-if="ready" :item="item" @showPreview="mediaPreview=item"/>
      </v-tab-item>
      <v-tab-item value="rels">
        <p>Related items</p>
      </v-tab-item>
<!--      <v-tab-item value="sus">
       <resource-fetch-item v-if="item.stratigraphicUnit" :item-id="`${item.stratigraphicUnit.id}`" resource-name="stratigraphicUnit">
          <template #default="su">
            <read-su-card v-if="su.item.id" :item="su.item" />
          </template>
        </resource-fetch-item>
      </v-tab-item>
      <v-tab-item value="graves">
        <collection-media-objects-card
          v-if="ready"
          tab="images"
          :parent="item"
          parent-request-filter-key="ecofact.id"
          resource-name="mediaObjectEcofact"
          parent-request-key="ecofact"
          @created="$fetch"
        >
          <delete-ecofact-card-text :item="item" />
        </collection-media-objects-card>
      </v-tab-item>-->
    </v-tabs-items>
    <media-object-preview-dialog v-if="mediaPreview" :media="mediaPreview" @close="mediaPreview = null"/>
    <delete-resource-dialog
      v-if="deletingItem"
      :resource-name="resourceName"
      :visible.sync="deleteDialog"
      :item="deletingItem"
      @itemDeleted="resetAndPrev"
    >
      <delete-ecofact-card-text :item="deletingItem" />
    </delete-resource-dialog>
  </v-card>
</template>

<script>
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import ResourceItemGetMixin from "@/mixins/ResourceItemGetMixin";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
import RouteTabbedComponentMixin from "@/mixins/RouteTabbedComponentMixin";

export default {
  name: "ItemDocumentCard",
  mixins: [
    ResourceItemGetMixin,
    ResourceItemDataAccessorMixin,
    ResourceDeleteDialogMixin,
    RouteTabbedComponentMixin
  ],
  data() {
    return {
      mediaPreview: null
    }
  }
}
</script>

<style scoped>

</style>
