<template>
  <v-dialog
    :value="visible"
    width="500"
    persistent
  >
    <v-card data-cy="delete-resource-dialog-card">
      <v-card-title class="error--text">
        Unlink
      </v-card-title>
      <v-card-text>
        You are unreferencing the following target resource.<br />
        <span class="text-overline secondary--text">{{resource.itemLabel}}</span><br class="mb-4"/>
      </v-card-text>
      <slot />
      <v-card-text>
        The resource will not be deleted. But it will unlinked from this <span class="text-overline secondary--text">{{parentResource.itemLabel}}</span><br />
      </v-card-text>
      <slot name="parent"/>
      <v-card-text>
        Are you sure you want to proceed?<br/>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn
          color="error"
          text
          data-cy="delete-btn"
          @click="unlinkItem"
        >
          Unlink
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
  name: "DeleteForeignKeyDialog",
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
    parentResourceName: {
      type: String,
      required: true
    },
    resourceField: {
      type: String,
      required: true
    }
  },
  computed: {
    id() {
      return this.item[this.idKey]
    },
    url() {
      return this.getItemResourcePath(this.id)
    },
    parentResource() {
      return this.$store.getters['api/getResource'](this.parentResourceName)
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
      this.$emit('close', false)
    },
    async unlinkItem() {
      try {
        await this.$store.dispatch('http/request', {
          method: 'patch',
          url: this.getItemResourceUrl(this.id),
          data: {
            [this.resourceField]: null
          },
          headers: {
            Accept: 'application/ld+json',
            'Content-Type':'application/merge-patch+json'
          }
        })
        await this.$store.dispatch('snackbar/show', {
          text: 'Successfully unlinked item',
          color: 'success'
        })
        this.$emit('itemDeleted')
      } catch (e) {
        await this.$store.dispatch('snackbar/requestError', e)
      } finally {
        this.close()
      }
    }
  }
}
</script>

<style scoped>

</style>
