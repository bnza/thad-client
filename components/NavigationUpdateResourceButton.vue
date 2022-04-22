<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        nuxt
        icon
        v-bind="attrs"
        :disabled="disabled"
        :to="getItemResourceUpdatePath(itemId)"
        data-cy="resource-update-btn"
        v-on="on"
      >
        <v-icon color="primary" class="mx-3">mdi-pencil</v-icon>
      </v-btn>
    </template>
    <span>Edit</span>
  </v-tooltip>
</template>

<script>
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";

export default {
  name: "NavigationUpdateResourceButton",
  mixins: [
    ResourceNavigationMixin
  ],
  props: {
    disabled: {
      type: Boolean,
      required: true
    },
    itemId: {
      required: true,
      validation: v => !isNaN(v) && Number.isInteger(+v)
    },
  }
}
</script>

<style scoped>

</style>
