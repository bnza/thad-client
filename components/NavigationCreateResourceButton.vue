<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        nuxt
        icon
        v-bind="attrs"
        :disabled="disabled"
        :to="`${createResourcePath}create`"
        v-on="on"
      >
        <v-icon class="mx-3">mdi-plus</v-icon>
      </v-btn>
    </template>
    <span>New</span>
  </v-tooltip>
</template>

<script>
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
export default {
  name: "NavigationCreateResourceButton",
  mixins: [
    ResourceNavigationMixin
  ],
  props: {
    disabled: {
      type: Boolean,
      required: true
    },
  }
}
</script>

<style scoped>

</style>
