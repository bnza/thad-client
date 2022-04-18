<template>
  <v-card-text>
    <v-container>
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
            :value="getResponseValue('code', item)"
            label="code"
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
      <v-row dense>
        <v-col>
          <v-text-field
            :value="getResponseValue('description', item)"
            label="description"
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
  name: "ReadSiteCard",
  mixins: [
    ResourceItemDataAccessorMixin
  ],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
}
</script>

<style scoped>

</style>
