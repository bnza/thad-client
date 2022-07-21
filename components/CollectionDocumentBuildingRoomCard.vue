<template>
  <v-col>
    <v-card
      data-cy="collection-document-sus-card"
      height="100%"
      class="mx-auto"
      outlined
    >
      <v-card-title class="text-overline mb-4" style="margin-bottom: 0; margin-top: 0; padding-top: 0; padding-bottom: 0">
          Buildings / Rooms
        <v-spacer />
        <v-tooltip
          v-if="enabled"
          bottom
        >
          <template #activator="{ on, attrs }">
            <v-btn
              data-cy="create-su-rel-btn"
              v-bind="attrs"
              icon
              x-small
              v-on="on"
              @click="createDialog = true"
            >
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </template>
          <span>Add building/room</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text >
        <v-chip-group>
          <item-sub-item-building-room-chip
            v-for="item in items"
            :key="item.id"
            :enabled="enabled"
            :item="item"
            id-item-path=""
            resource-name="mediaObjectBuildingRoom"
            @delete="openDeleteDialog($event)"
           />
        </v-chip-group>
      </v-card-text>
      <create-document-building-room-dialog
        :parent="parent"
        :visible.sync="createDialog"
        resource-name="mediaObjectBuildingRoom"
        @created="$fetch()"
      />
      <delete-resource-dialog
        v-if="deletingItem"
        :resource-name="resourceName"
        :visible.sync="deleteDialog"
        :item="deletingItem"
        @itemDeleted="resetAndFetch"
      >
        <delete-media-object-card-text :item="deletingItem" :parent="parent">
              <delete-building-room-card-text :item="deletingItem" />
        </delete-media-object-card-text>
      </delete-resource-dialog>
    </v-card>
  </v-col>
</template>

<script>
import ResourceCollectionGetMixin from "@/mixins/ResourceCollectionGetMixin";
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
export default {
  name: "CollectionDocumentBuildingRoomCard",
  mixins: [
    ResourceCollectionGetMixin,
    ResourceDeleteDialogMixin
  ],
  props: {
    enabled: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      createDialog: false
    }
  },
  created() {
    this.pagination = {
      pagination: false
    }
  }
}
</script>
