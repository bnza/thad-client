<template>
  <v-app dark>
    <the-navigation-drawer :visible="drawer"></the-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="primary">
      <v-app-bar-nav-icon data-cy="app-bar-nav-icon" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="title" v-text="title"/>
      <v-spacer />
      <work-site-container />
      <v-spacer />
      <auth-span-status />
    </v-app-bar>
    <v-main>
      <v-container fluid class="pa-0">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <the-snackbar></the-snackbar>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: ['auth'],
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'LoNAP excavations database',
    }
  }
}
</script>

<style scoped lang="sass">
.title
  font-family: 'Asul', 'Work Sans', Arial, sans-serif !important
  font-weight: bold
</style>
