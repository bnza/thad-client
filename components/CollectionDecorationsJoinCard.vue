<template>
  <v-col>
    <v-card
      data-cy="collection-decorations-potteries-card"
      height="100%"
      class="mx-auto"
      outlined
    >
      <v-card-title class="text-overline mb-4" style="margin-bottom: 0; margin-top: 0; padding-top: 0; padding-bottom: 0">
          Decorations
        <v-spacer />
        <v-tooltip
          v-if="enabled"
          bottom
        >
          <template #activator="{ on, attrs }">
            <v-btn
              data-cy="create-rel-btn"
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
          <span>Add decoration</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text >
        <v-chip-group>
          <item-vocabulary-sub-item-chip
            v-for="item in items"
            :key="item.id"
            :enabled="enabled"
            :item="item"
            vocabulary-key="decoration"
            @delete="openDeleteDialog($event)"
           />
        </v-chip-group>
      </v-card-text>
      <create-decoration-join-dialog
        :parent="parent"
        :visible.sync="createDialog"
        :resource-name="resourceName"
        :parent-resource-name="parentResourceName"
        @created="$fetch()"
      >
        <slot />
      </create-decoration-join-dialog>
      <delete-resource-dialog
        v-if="deletingItem"
        :resource-name="resourceName"
        :visible.sync="deleteDialog"
        :item="deletingItem"
        @itemDeleted="resetAndFetch"
      />
    </v-card>
  </v-col>
</template>

<script>
import ResourceCollectionGetMixin from "@/mixins/ResourceCollectionGetMixin";
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
export default {
  name: "CollectionDecorationsPotteriesCard",
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
  computed: {
    parentResourceName() {
      // remove ".id" from pottery.id and smallFind.id
      // @TODO generalize
      return this.parentRequestFilterKey.slice(0,-3)
    }
  },
  created() {
    this.pagination = {
      pagination: false
    }
  }
}
</script>
