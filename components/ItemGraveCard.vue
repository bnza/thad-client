<template>
  <v-card data-cy="item-grave-card">
    <v-toolbar flat>
      <navigation-prev-button />
      <v-toolbar-title>Grave</v-toolbar-title>
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
          <v-tab href="#data">Data</v-tab>
          <v-tab href="#sus">Stratigraphic units</v-tab>
          <v-tab href="#images">Media</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item value="data">
       <lazy-read-grave-card v-if="ready" :item="item" />
      </v-tab-item>
      <v-tab-item value="sus">
        <collection-sus-card
          v-if="ready"
          tab="sus"
          :parent="item"
          parent-request-filter-key="grave.id"
          resource-name="stratigraphicUnit"
        >
          <template #create-action >
            <create-resource-button
              :disabled="!$auth.hasScope('ROLE_EDITOR')"
              resource-name="stratigraphicUnit"
              @click="addLinkDialog=true"
            />
          </template>
          <template #delete-dialog="{deletingItem, visible, events}" >
            <lazy-delete-foreign-key-dialog
              v-if="deletingItem"
              :visible="visible"
              :item="deletingItem"
              resource-field="grave"
              :parent-resource-name="resourceName"
              resource-name="stratigraphicUnit"
              @itemDeleted="resetAndFetch"
              @close="events.closeDeleteDialog"
            >
              <template #parent>
                <lazy-delete-grave-card-text :item="item" />
              </template>
              <delete-su-card-text :item="deletingItem"/>
            </lazy-delete-foreign-key-dialog>
          </template>
        </collection-sus-card>
      </v-tab-item>
      <v-tab-item value="images">
        <collection-media-objects-card
          v-if="ready"
          tab="images"
          :parent="item"
          :enable-pagination="false"
          parent-request-filter-key="grave.id"
          resource-name="mediaObjectGrave"
          parent-request-key="grave"
          @created="$fetch"
        >
          <lazy-delete-grave-card-text :item="item" />
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
      <delete-site-card-text :item="deletingItem" />
    </delete-resource-dialog>
    <add-foreign-key-dialog
      resource-field="grave"
      :parent-resource-name="resourceName"
      :visible.sync="addLinkDialog"
      :item="item"
      resource-name="stratigraphicUnit"
      @linked="resetAndFetch"
      >
      <lazy-delete-grave-card-text :item="item" />
    </add-foreign-key-dialog>
  </v-card>
</template>

<script>
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import RouteTabbedComponentMixin from "@/mixins/RouteTabbedComponentMixin";
import ResourceItemGetMixin from "@/mixins/ResourceItemGetMixin";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";

export default {
  name: "ItemGraveCard",
  mixins: [
    ResourceItemGetMixin,
    ResourceDeleteDialogMixin,
    ResourceItemGetMixin,
    RouteTabbedComponentMixin,
    ResourceItemDataAccessorMixin,
  ],
  data() {
    return {
      addLinkDialog: false
    }
  }
}
</script>

<style scoped>

</style>
