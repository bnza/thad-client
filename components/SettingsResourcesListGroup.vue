<template>
  <v-list-group
    v-model="groupOpen"
    no-action
    prepend-icon="mdi-cog-box"
  >
    <template #activator>
      <v-list-item-title>Settings</v-list-item-title>
    </template>
    <v-list>
      <v-list-item
        nuxt
        to="/data/users/me"
        router
      >
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>User</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-if="$auth.hasScope('ROLE_ADMIN')"
        nuxt
        to="/data/users"
        router
      >
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Users</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-list-group>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "SettingsResourcesListGroup",
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
