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
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item value="data">
        <read-document-card v-if="ready" :item="item" @showPreview="mediaPreview=item"/>
      </v-tab-item>
      <v-tab-item value="rels">
        <lazy-collection-document-related-items-container
          v-if="ready"
          :item="item"
          :resource-name="resourceName"
          @updated="updateResponse($event)"
        />
      </v-tab-item>
    </v-tabs-items>
    <media-object-preview-dialog v-if="mediaPreview" :media="mediaPreview" @close="mediaPreview = null"/>
    <delete-resource-dialog
      v-if="deletingItem"
      :resource-name="resourceName"
      :visible.sync="deleteDialog"
      :item="deletingItem"
      @itemDeleted="resetAndPrev"
    >
      <delete-document-card-text :item="deletingItem" />
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
  },
  methods: {
    updateResponse(response) {
      this.response = response
    }
  }
}
</script>

<style scoped>

</style>
