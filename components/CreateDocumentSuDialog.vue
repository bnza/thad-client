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
        <select-sus-autocomplete
          data-cy="dx-su-input"
          :select.sync="modelItem.su"
          :area="parent.area"
          :error-messages="stratigraphicUnitErrors"
          v-on="$listeners"
          @input="$v.requestData.stratigraphicUnit.$touch()"
          @blur="$v.requestData.stratigraphicUnit.$touch()"
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
import ResourceValidationDocumentSUMixin from "@/mixins/validation/ResourceValidationDocumentSUMixin";

export default {
  name: "CreateDocumentSuDialog",
  mixins: [
    ResourceCreateResourceJoinMixin,
    ResourceValidationDocumentSUMixin
  ],
  computed: {
    defaultModelItem() {
      return {
        su: {}
      }
    },
    requestData() {
      return {
        mediaObject: this.parent.mediaObject['@id'],
        stratigraphicUnit: this.modelItem.su['@id']
      }
    }
  },
}
</script>
