<template>
  <fragment>
    <template v-if="$auth.loggedIn">
      <v-icon :color="color" class="mx-3">mdi-account-circle</v-icon>
      <v-toolbar-title class="text-body-1">
        {{ $auth.user.email }}</v-toolbar-title
      >
    </template>
    <AuthButtonToggle
      :logged-in="$auth.loggedIn"
      @login="login"
      @logout="logout"
    />
  </fragment>
</template>

<script>
// eslint-disable-next-line import/named
import { Fragment } from 'vue-frag'
import AuthButtonToggle from '@/components/AuthButtonToggle'

export default {
  name: 'AuthSpanStatus',
  components: {
    Fragment,
    AuthButtonToggle,
  },
  computed: {
    color() {
      if (this.$auth.loggedIn) {
        if (this.$auth.hasScope('ROLE_ADMIN')) {
          return 'error'
        }
        if (this.$auth.hasScope('ROLE_EDITOR')) {
          return 'warning'
        }
        return 'success'
      }
      return 'white'
    },
  },
  methods: {
     login() {
       this.$router.push('/login')
    },
    logout() {
      this.$auth.logout()
    },
  },
}
</script>

<style scoped></style>
