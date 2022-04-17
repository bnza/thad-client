<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        nuxt
        icon
        v-bind="attrs"
        :disabled="disabled"
        :to="`${resourceBaseUrl}${itemId}/edit`"
        v-on="on"
      >
        <v-icon color="primary" class="mx-3">mdi-pencil</v-icon>
      </v-btn>
    </template>
    <span>Edit</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "NavigationUpdateResourceButton",
  props: {
    disabled: {
      type: Boolean,
      required: true
    },
    resourceBaseUrl: {
      type: String,
      required: true
    },
    itemId: {
      type: String,
      required: true
    },
  }
}
</script>

<style scoped>

</style>
