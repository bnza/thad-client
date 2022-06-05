<template>
  <v-card-text>
    <v-container>
      <v-row dense>
        <v-text-field
          color="secondary"
          class="secondary--text font-weight-bold"
          :value="formatCode('grave', item)"
          label="code"
          readonly
        />
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
  name: "DeleteGraveCardText",
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
