<template>
  <v-dialog
    data-cy="create-building--room-rel-dialog"
    :value="visible"
    width="500"
    persistent
  >
    <v-card data-cy="create-document-simple-item-card">
      <v-card-title class="text-overline mb-4 secondary--text" >
        Add building/room
      </v-card-title>
      <v-card-text>
        <v-row dense >
          <v-col>
            <v-text-field
              v-model="modelItem.building"
              label="building"
              required
              :error-messages="buildingErrors"
              class="mx-4"
              @input="$v.modelItem.building.$touch()"
              @blur="$v.modelItem.building.$touch()"
            />
          </v-col>
        </v-row>
        <v-row dense >
          <v-col>
            <v-text-field
              v-model="modelItem.room"
              label="room"
              required
              :error-messages="roomErrors"
              class="mx-4"
              @input="$v.modelItem.room.$touch()"
              @blur="$v.modelItem.room.$touch()"
            />
          </v-col>
        </v-row>
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
import ResourceValidationDocumentBuildingRoomMixin
  from "@/mixins/validation/ResourceValidationDocumentBuildingRoomMixin";
import ResourceCreateMediaLinkMixin from "@/mixins/ResourceCreateMediaLinkMixin";

export default {
  name: "CreateDocumentBuildingRoomDialog",
  mixins: [
    ResourceValidationDocumentBuildingRoomMixin,
    ResourceCreateMediaLinkMixin
  ],
  computed: {
    defaultModelItem() {
      return {}
    },
    requestData() {
      return {
        mediaObject: this.parent.mediaObject['@id'],
        building: !Number.isNaN(this.modelItem.building)? 1 * this.modelItem.building : undefined,
        room: this.modelItem.room
      }
    }
  },
}
</script>
