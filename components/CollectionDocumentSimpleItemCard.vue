<template>
  <v-col>
    <v-card
      data-cy="collection-su-building-card"
      class="my-4"
      outlined
    >
      <v-card-title class="text-overline mb-4" style="margin-bottom: 0; margin-top: 0; padding-top: 0; padding-bottom: 0">
          {{name}}s
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
          <span>Add {{ name }}</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text >
        <v-chip-group>
          <v-chip
            v-for="(item, index) in items"
            :key="index"
            data-cy="item-building-chip"
            :close="enabled && $auth.hasScope('ROLE_EDITOR')"
            label
            @click:close="openDeleteDialog(index)"
          >
            {{ item }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
      <slot name="createDialog" v-bind="{items, visible: createDialog, events: {closeCreateDialog}}">
        <create-document-simple-item-dialog
          :items="items"
          :name="name"
          :visible="createDialog"
          @update="$emit('update', $event)"
        />
      </slot>
      <delete-document-simple-item-dialog
          v-if="deletingItemIndex > -1"
          :visible.sync="deleteDialog"
          :deleting-item-index="deletingItemIndex"
          :items="items"
          :name="name"
          @delete="$emit('delete', $event)"
          />
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "CollectionDocumentSimpleItemCard",
  props: {
    enabled: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    fieldName: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      createDialog: false,
      deleteDialog: false,
      deletingItemIndex: -1
    }
  },
  methods: {
    openDeleteDialog(index) {
      this.deletingItemIndex = index
      this.deleteDialog = true
    },
    closeCreateDialog() {
      this.createDialog = false
    },
    closeDeleteDialog() {
      this.deleteDialog = false
    }
  }
}
</script>
