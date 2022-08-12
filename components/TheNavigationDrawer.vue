<template>
  <v-navigation-drawer
    data-cy="app-navigation-drawer"
    :value="visible"
    fixed
    app
  >
    <v-list>
      <v-list-item
        nuxt
        to="/"
        router
        exact
      >
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
    </v-list>
    <main-resources-list-group v-if="$auth.loggedIn" />
    <settings-resources-list-group v-if="$auth.loggedIn" />
<!--    <v-list>
      <v-list-item
        :href="`${$config.apiBaseUrl}/${$config.apiPrefix}`"
        target="_blank"
      >
        <v-list-item-icon>
          <v-icon>mdi-api</v-icon>
        </v-list-item-icon>
        <v-list-item-title>API</v-list-item-title>
      </v-list-item>
    </v-list>-->
    <v-list>
      <v-list-item
        nuxt
        to="/about"
        router
      >
        <v-list-item-icon>
          <v-icon>mdi-information</v-icon>
        </v-list-item-icon>
        <v-list-item-title>About</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import MainResourcesListGroup from "@/components/MainResourcesListGroup";
export default {
  name: "TheNavigationDrawer",
  components: {
    MainResourcesListGroup
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dataGroup: false
    }
  }
}
</script>

<style scoped>

</style>
