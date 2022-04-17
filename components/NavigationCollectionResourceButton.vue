<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        nuxt
        :to="resourceBaseUrl"
        v-on="on"
      >
        <v-icon class="mx-3">mdi-format-list-numbered</v-icon>
      </v-btn>
    </template>
    <span>Show list</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "NavigationCollectionResourceButton",
  props: {
    resourceBaseUrl: {
      type: String,
      required: true
    },
  }
}
</script>

<style scoped>

</style>
