<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        nuxt
        icon
        v-bind="attrs"
        :to="`${resourceBaseUrl}${itemId}`"
        v-on="on"
      >
        <v-icon color="primary" class="mx-3">mdi-arrow-right</v-icon>
      </v-btn>
    </template>
    <span>View</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "NavigationResourceReadButton",
  props: {
    resourceBaseUrl: {
      type: String,
      required: true
    },
    itemId: {
      required: true,
      validation: v => !isNaN(v) && Number.isInteger(+v)
    }
  }
}
</script>

<style scoped>

</style>
