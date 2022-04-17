<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        :disabled="disabled"
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
export default {
  name: "NavigationDeleteResourceButton",
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
