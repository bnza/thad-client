<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        :disabled="disabled"
        data-cy="resource-delete-btn"
        v-on="on"
        @click="$emit('delete', itemId)"
      >
        <v-icon color="error" class="mx-3">mdi-delete</v-icon>
      </v-btn>
    </template>
    <span>Delete</span>
  </v-tooltip>
</template>

<script>
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";

export default {
  name: "NavigationDeleteResourceButton",
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
