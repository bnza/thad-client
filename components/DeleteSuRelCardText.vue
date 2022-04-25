<template>
  <v-card-text>
    <v-container>
      <v-row dense>
        <v-col>
          <v-text-field
            :value="getResponseValue('sxSU.number', item)"
            label="stratigraphic unit"
            readonly
          />
        </v-col>
        <v-col>
          <v-text-field
            :value="relationship.value"
            label="relationship"
            readonly
          />
        </v-col>
        <v-col>
          <v-text-field
            :value="getResponseValue('dxSU.number', item)"
            label="stratigraphic unit"
            readonly
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>

<script>
import {mapState} from "vuex";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";

export default {
  name: "DeleteSuRelCardText",
  mixins: [
    ResourceItemDataAccessorMixin
  ],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState('vocabularies', {relationships: 'su_relationships'}),
    relationship() {
      const relationIri = this.item.relationship
      return this.relationships.find(relation => relation['@id'] === relationIri)
    }
  }
}
</script>

<style scoped>

</style>
