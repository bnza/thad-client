<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        data-cy="resource-filter-btn"
        v-on="on"
        @click="$emit('click')"
      >
        <v-icon class="mx-3">mdi-magnify</v-icon>
      </v-btn>
    </template>
    <span>Search</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "NavigationFilterCollectionButton",
}
</script>
