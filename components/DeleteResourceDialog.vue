<template>
  <v-dialog
    :value="visible"
    width="500"
  >
    <v-card>
      <v-card-title class="error">
        Delete
      </v-card-title>
    </v-card>
    <v-card-actions>
      <v-btn
        color="error"
        text
        @click="deleteItem"
      >
        Delete
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        text
        @click="close"
      >
        Cancel
      </v-btn>
    </v-card-actions>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteResourceDialog",
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
    resourceBaseUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    id() {
      return this.item[this.idKey]
    },
    url() {
      return `${this.resourceBaseUrl}${this.id}`
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
          url: this.url
        })
        await this.$store.dispatch('snackbar/show', {
          text: 'Successfully deleted item',
          color: 'success'
        })
        this.$emit('itemDeleted')
        this.close()
    } catch (e) {
      await this.$store.dispatch('snackbar/requestError', e)
    }

    }
  }
}
</script>

<style scoped>

</style>
