<template>
  <v-dialog
    data-cy="create-su-rel-dialog"
    :value="visible"
    width="500"
    persistent
  >
    <v-card data-cy="create-su-rel-card">
      <v-card-title class="text-overline mb-4 secondary--text" >
        Add document link
      </v-card-title>
      <v-card-text>
        <v-row dense justify="center">
          <v-col class="d-flex justify-center align-center">
            <media-object-card :media="parent" />
            <p v-if="mediaObjectErrors">
              <span
                v-for="(error, index) in mediaObjectErrors"
                :key="index"
                class="error--text"
              >
                {{error}}
              </span>
            </p>
          </v-col>
        </v-row>
        <select-graves-autocomplete
          data-cy="grave-input"
          :select.sync="modelItem.grave"
          :area="parent.area"
          :error-messages="graveErrors"
          v-on="$listeners"
          @input="$v.requestData.grave.$touch()"
          @blur="$v.requestData.grave.$touch()"
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
import ResourceCreateResourceJoinMixin from "@/mixins/ResourceCreateResourceJoinMixin";
import ResourceValidationDocumentGraveMixin from "@/mixins/validation/ResourceValidationDocumentGraveMixin";

export default {
  name: "CreateDocumentGraveDialog",
  mixins: [
    ResourceCreateResourceJoinMixin,
    ResourceValidationDocumentGraveMixin
  ],
  computed: {
    defaultModelItem() {
      return {
        grave: {}
      }
    },
    requestData() {
      return {
        mediaObject: this.parent.mediaObject['@id'],
        grave: this.modelItem.grave['@id']
      }
    }
  },
}
</script>
