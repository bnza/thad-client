<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        nuxt
        :to="resourceBasePath"
        v-on="on"
      >
        <v-icon class="mx-3">mdi-format-list-numbered</v-icon>
      </v-btn>
    </template>
    <span>Show list</span>
  </v-tooltip>
</template>

<script>
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";

export default {
  name: "NavigationCollectionResourceButton",
  mixins: [
    ResourceNavigationMixin
  ],
}
</script>

<style scoped>

</style>
