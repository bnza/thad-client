<template>
  <v-card-text>
    <v-container>
      <v-row dense>
        <v-col>
          <v-text-field
            color="secondary"
            class="secondary--text font-weight-bold"
            :value="formatCode('ecofact', item)"
            label="code"
            readonly
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-text-field
            :value="getResponseValue('stratigraphicUnit.site.code', item)"
            label="site"
            readonly
          />
        </v-col>
        <v-col>
          <v-text-field
            :value="getResponseValue('stratigraphicUnit.area.code', item)"
            label="code"
            readonly
          />
        </v-col>
        <v-col>
          <v-text-field
            :value="getResponseValue('stratigraphicUnit.number', item)"
            label="SU"
            readonly
          />
        </v-col>
        <v-col>
          <v-text-field
            :value="getResponseValue('number', item)"
            label="number"
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
  name: "DeleteEcofactCardText",
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
