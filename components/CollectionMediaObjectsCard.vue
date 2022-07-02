<template>
  <v-card
    :loading="$fetchState.pending"
    data-cy="collection-media-object-card"
    flat
  >
    <v-toolbar flat dense>
      <v-toolbar-title v-if="!isChild">Media Objects</v-toolbar-title>
      <v-spacer />
      <create-resource-button
        v-if="$auth.hasScope('ROLE_EDITOR')"
        :resource-name="resourceName"
        :disabled="false"
        @click="mediaDialog=true"
      />
    </v-toolbar>
    <v-layout style="background-color: rgb(18,18,18)">
      <v-row
        v-if="items && items.length"
        align-content="start"
        no-gutters
      >
        <v-col
          v-for="item in items"
          :key="item.id"
          lg="3"
          md="4"
          class="d-flex child-flex my-4"
        >
          <media-object-card
            :media="item"
            class="mx-4"
            @click="mediaPreview=item"
          >
            <template #actions>
              <navigation-resource-read-button v-if="item.mediaObject.document" :item-id="item.mediaObject.document.id" resource-name="document" />
              <navigation-download-image-button :media="item"/>
              <navigation-delete-resource-button
                :item-id="item.id"
                :disabled="editable"
                :resource-name="resourceName"
                @delete="openDeleteDialog(item)"
              />
            </template>
          </media-object-card>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row v-else>
        <v-col />
        <v-col class="my-16">
          <div class="d-flex justify-center" >
            <p>No media associated</p>
          </div>
        </v-col>
        <v-col />
      </v-row>
    </v-layout>
    <media-object-preview-dialog v-if="mediaPreview" :media="mediaPreview" @close="mediaPreview = null"/>
    <delete-resource-dialog
      v-if="deletingItem"
      :resource-name="resourceName"
      :visible.sync="deleteDialog"
      :item="deletingItem"
      @itemDeleted="resetAndFetch"
    >
      <delete-media-object-card-text :item="deletingItem" :parent="parent">
        <slot />
      </delete-media-object-card-text>
    </delete-resource-dialog>
    <edit-join-media-object-dialog
      :visible.sync="mediaDialog"
      :resource-name="resourceName"
      :parent="parent"
      :parent-request-key="parentRequestKey"
      @created="$fetch"
    />
  </v-card>
</template>

<script>
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import ResourceCollectionGetMixin from "@/mixins/ResourceCollectionGetMixin";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";

export default {
  name: "CollectionMediaObjectsCard",
  mixins: [
    ResourceCollectionGetMixin,
    ResourceDeleteDialogMixin,
    ResourceItemDataAccessorMixin
  ],
  props: {
    parentRequestKey: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      mediaDialog: false,
      mediaPreview: null
    }
  },
  computed: {
    editable() {
      return !this.$auth.hasScope('ROLE_EDITOR')
    }
  }
}
</script>

<style>
table > tbody > tr > td.fixed,
table > thead > tr > th.fixed {
  position: sticky !important;
  position: -webkit-sticky !important;
  left: 0;
  z-index: 98;
  background: rgba(30,30,30);
  -webkit-box-shadow: -1px 0 3px -1px rgba(0, 0, 0, 0.19);
  -moz-box-shadow: -1px 0 3px -1px rgba(0, 0, 0, 0.19);
  box-shadow: -1px 0 3px -1px rgba(0, 0, 0, 0.19);
}

table > thead > tr > th.fixed {
  z-index: 99 !important;
}
</style>
