<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        nuxt
        icon
        v-bind="attrs"
        :to="getItemResourcePath(itemId)"
        data-cy="resource-read-btn"
        v-on="on"
      >
        <v-icon color="primary" class="mx-3">mdi-arrow-right</v-icon>
      </v-btn>
    </template>
    <span>View</span>
  </v-tooltip>
</template>

<script>
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";

export default {
  name: "NavigationResourceReadButton",
  mixins: [
    ResourceNavigationMixin
  ],
  props: {
    itemId: {
      required: true,
      validation: v => !isNaN(v) && Number.isInteger(+v)
    }
  }
}
</script>

<style scoped>

</style>
