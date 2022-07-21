<template>
  <v-card-text>
    <v-container>
      <v-row dense>
        <v-col>
          <v-text-field
            :value="getResponseValue('building', item)"
            label="building"
            readonly
          />
        </v-col>
        <v-col>
          <v-text-field
            :value="getResponseValue('room', item)"
            label="room"
            readonly
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>

<script>
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
export default {
  name: "DeleteBuildingRoomCardText",
  mixins: [
    ResourceItemDataAccessorMixin
  ],
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
