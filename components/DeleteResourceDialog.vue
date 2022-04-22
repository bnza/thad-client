<template>
  <v-dialog
    :value="visible"
    width="500"
  >
    <v-card data-cy="delete-resource-dialog-card">
      <v-card-title class="error--text">
        Delete
      </v-card-title>
      <v-card-text>
        Are you sure you want delete this resource?
      </v-card-text>
      <slot />
      <v-divider />
      <v-card-actions>
        <v-btn
          color="error"
          text
          data-cy="delete-btn"
          @click="deleteItem"
        >
          Delete
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          data-cy="cancel-btn"
          @click="close"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";

export default {
  name: "DeleteResourceDialog",
  mixins: [
    ResourceNavigationMixin
  ],
  props: {
    idKey: {
      type: String,
      default: 'id'
    },
    item: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
  },
  computed: {
    id() {
      return this.item[this.idKey]
    },
    url() {
      return this.getItemResourcePath(this.id)
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    async deleteItem() {
      try {
        await this.$store.dispatch('http/request', {
          method: 'delete',
          url: this.getItemResourceUrl(this.id)
        })
        await this.$store.dispatch('snackbar/show', {
          text: 'Successfully deleted item',
          color: 'success'
        })
        this.$emit('itemDeleted')
      } catch (e) {
        await this.$store.dispatch('snackbar/requestError', e)
        this.close()
      }
    }
  }
}
</script>

<style scoped>

</style>
