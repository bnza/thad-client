<template>
  <v-list-group
    v-model="groupOpen"
    data-cy="main-resources-list-group"
    no-action
    prepend-icon="mdi-text-box"
  >
    <template #activator>
      <v-list-item-title>Main</v-list-item-title>
    </template>
    <v-list-item
      v-for="(resource, i) in mainResources"
      :key="i"
      :data-cy="`${resource.resourceName}-drawer-list-item`"
      nuxt
      :to="resource.collectionPath"
      router
    >
      <v-list-item-title class="text-capitalize">{{ resource.collectionLabel }}</v-list-item-title>
    </v-list-item>
  </v-list-group>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "MainResourcesListGroup",
  data() {
    return {
      groupOpen: false
    }
  },
  computed: {
    ...mapGetters('api', ['mainResources', 'mainResources']),
  }
}
</script>

<style scoped>

</style>
