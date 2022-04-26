<template>
  <v-list-group
    v-model="groupOpen"
    no-action
    prepend-icon="mdi-text-box"
  >
    <template #activator>
      <v-list-item-title>Main</v-list-item-title>
    </template>
    <v-list-item
      v-for="(resource, i) in mainResources"
      :key="i"
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
