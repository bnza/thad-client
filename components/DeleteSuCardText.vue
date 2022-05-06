<template>
  <v-card-text>
    <v-container>
      <v-row dense>
        <v-col>
          <v-text-field
            color="secondary"
            class="secondary--text font-weight-bold"
            :value="formatCode('stratigraphicUnit', item)"
            label="code"
            readonly
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-text-field
            :value="getResponseValue('site.code', item)"
            label="site"
            readonly
          />
        </v-col>
        <v-col>
          <v-text-field
            :value="getResponseValue('area.code', item)"
            label="area"
            readonly
          />
        </v-col>
        <v-col>
          <v-text-field
            :value="getResponseValue('year', item)"
            label="year"
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
  name: "DeleteSuCardText",
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
