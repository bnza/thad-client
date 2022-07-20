<template>
  <v-dialog
    data-cy="create-su-rel-dialog"
    :value="visible"
    width="500"
    persistent
  >
    <v-card data-cy="create-su-rel-card">
      <v-card-title class="text-overline mb-4 secondary--text" >
        Add decoration link
      </v-card-title>
      <v-card-text>
        <v-row dense justify="center">
          <v-col class="d-flex justify-center align-center">
            <slot />
          </v-col>
        </v-row>
        <select-vocabulary-autocomplete
          data-cy="decoration-input"
          label="decoration"
          :select.sync="modelItem.decoration"
          class="mx-4"
          vocabulary-name="decoration"
          v-on="$listeners"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          data-cy="submit-btn"
          @click="submit"
        >
          Submit
        </v-btn>
        <v-spacer />
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
import ResourceCreateMediaLinkMixin from "@/mixins/ResourceCreateMediaLinkMixin";
import ResourceCollectionParentMixin from "@/mixins/ResourceCollectionParentMixin";

export default {
  name: "CreateDecorationJoinDialog",
  mixins: [
    ResourceCreateMediaLinkMixin,
    ResourceCollectionParentMixin
  ],
  props: {
    parentResourceName: {
      type: String,
      required: true
    }
  },
  computed: {
    defaultModelItem() {
      return {
        su: {}
      }
    },
    requestData() {
      return {
        [this.parentResourceName]: this.parent['@id'],
        decoration: this.modelItem.decoration['@id']
      }
    }
  },
}
</script>
