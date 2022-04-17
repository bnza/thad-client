<template>
  <v-navigation-drawer
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
    <v-list-group
      v-if="$auth.loggedIn"
      v-model="dataGroup"
      no-action
      prepend-icon="mdi-text-box"
    >
      <template #activator>
        <v-list-item-title>Data</v-list-item-title>
      </template>
      <v-list-item
        nuxt
        to="/app/sites"
        router
      >
        <v-list-item-title>Site</v-list-item-title>
      </v-list-item>
      <v-list-item
        nuxt
        to="/app/areas"
        router
      >
        <v-list-item-title>Area</v-list-item-title>
      </v-list-item>
      <v-list-item
        nuxt
        to="/app/sus"
        router
      >
        <v-list-item-title>Stratigraphic Unit</v-list-item-title>
      </v-list-item>
    </v-list-group>
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
export default {
  name: "TheNavigationDrawer",
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
