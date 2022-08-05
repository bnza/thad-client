<template>
  <v-dialog
    data-cy="create-su-rel-dialog"
    :value="visible"
    width="500"
    persistent
  >
    <v-card data-cy="create-su-rel-card">
      <v-card-title class="text-overline mb-4 secondary--text" >
        Add relationship
      </v-card-title>
      <v-card-text>
        <v-text-field
          :value="formatCode('stratigraphicUnit', sxSu)"
          label="stratigraphic unit"
          readonly
        />
        <p v-if="sxSUErrors">
              <span
                v-for="(error, index) in sxSUErrors"
                :key="index"
                class="error--text"
              >
                {{error}}
              </span>
        </p>
        <v-text-field
          :value="getResponseValue('value', relationship)"
          label="relationship"
          readonly
        />
        <p v-if="relationshipErrors">
              <span
                v-for="(error, index) in relationshipErrors"
                :key="index"
                class="error--text"
              >
                {{error}}
              </span>
        </p>
        <select-sus-autocomplete
          data-cy="dx-su-input"
          :select.sync="modelItem.dxSu"
          :area="sxSu.area"
          :error-messages="dxSUErrors"
          v-on="$listeners"
          @input="$v.requestData.dxSU.$touch()"
          @blur="$v.requestData.dxSU.$touch()"
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
import ResourceValidationSURelMixin from "@/mixins/validation/ResourceValidationSURelMixin";

export default {
  name: "CreateSuRelDialog",
  mixins: [
    ResourceCreateResourceJoinMixin,
    ResourceValidationSURelMixin
  ],
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    sxSu: {
      type: Object,
      required: true
    },
    relationship: {
      type: Object,
      required: true
    }
  },
  computed: {
    defaultModelItem() {
      return {
        dxSu: {}
      }
    },
    requestData() {
      return {
        sxSU: this.sxSu['@id'],
        relationship: this.relationship['@id'],
        dxSU: this.modelItem.dxSu ? this.modelItem.dxSu['@id'] : null
      }
    }
  },
}
</script>
