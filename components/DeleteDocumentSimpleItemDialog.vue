<template>
  <v-dialog
    :value="visible"
    width="500"
    persistent
  >
    <v-card data-cy="delete-resource-dialog-card">
      <v-card-title class="error--text">
        Delete {{ name }}
      </v-card-title>
      <v-card-text>
        Are you sure you want delete this {{ name }}?<br/>
        <v-row dense>
          <v-col>
            <v-text-field
              color="secondary"
              class="secondary--text font-weight-bold"
              :value="items[deletingItemIndex]"
              :label="name"
              readonly
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn
          color="error"
          text
          data-cy="delete-btn"
          @click="submit"
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
export default {
  name: "DeleteDocumentSimpleItemDialog",
  props: {
    name: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    deletingItemIndex: {
      type: Number,
      required: true
    },
    visible: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    requestData() {
      const items = [...this.items]
      items.splice(this.deletingItemIndex, 1)
      return items
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    submit() {
      this.$emit('delete', this.requestData)
      this.close()
    }
  }
}
</script>

<style scoped>

</style>
