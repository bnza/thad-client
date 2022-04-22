<template>
  <v-card-text>
    <v-container>
      <v-row dense>
        <v-col>
          <v-text-field
            :value="getResponseValue('code', item)"
            label="site"
            readonly
          />
        </v-col>
        <v-col>
          <v-text-field
            :value="getResponseValue('name', item)"
            label="name"
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
  name: "DeleteSiteCardText",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  mixins: [
    ResourceItemDataAccessorMixin
  ]
}
</script>

<style scoped>

</style>
