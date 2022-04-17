<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        nuxt
        icon
        v-bind="attrs"
        :disabled="disabled"
        :to="`${resourceBaseUrl}create`"
        v-on="on"
      >
        <v-icon class="mx-3">mdi-plus</v-icon>
      </v-btn>
    </template>
    <span>New</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "NavigationCreateResourceButton",
  props: {
    disabled: {
      type: Boolean,
      required: true
    },
    resourceBaseUrl: {
      type: String,
      required: true
    },
  }
}
</script>

<style scoped>

</style>
