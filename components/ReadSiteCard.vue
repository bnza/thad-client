<template>
  <v-card-text>
    <v-container>
      <v-row dense>
        <v-col>
          <v-text-field
            :value="getResponseValue('code')"
            label="code"
            readonly
          />
        </v-col>
        <v-col>
          <v-text-field
            :value="getResponseValue('name')"
            label="name"
            readonly
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-text-field
            :value="getResponseValue('description')"
            label="description"
            readonly
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>

<script>
import ResourceItemFormMixin from "@/mixins/ResourceItemFormMixin";

export default {
  name: "ReadSiteCard",
  mixins: [
    ResourceItemFormMixin
  ],
  computed: {
    resourceName() {
      return 'sites'
    },
    code() {
      return this.getResponseValue('code')
    }
  },
}
</script>

<style scoped>

</style>
