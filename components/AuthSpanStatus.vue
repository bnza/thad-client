<template>
  <fragment>
    <template v-if="$auth.loggedIn">
      <v-icon :color="color" class="mx-3">mdi-account-circle</v-icon>
      <v-toolbar-title class="text-body-1" data-cy="logged_user">
        {{ $auth.user.email }}
      </v-toolbar-title>
    </template>
    <auth-button-toggle
      :logged-in="$auth.loggedIn"
      @login="login"
      @logout="logoutDialog = true"
    />
    <auth-logout-dialog
      :dialog="logoutDialog"
      @cancel="logoutDialog=false"
      @logout="logout"
    />
  </fragment>
</template>

<script>
// eslint-disable-next-line import/named
import { Fragment } from 'vue-frag'
import ShowSnackbarMixin from "@/mixins/ShowSnackbarMixin";
import AuthButtonToggle from '@/components/AuthButtonToggle'
import AuthLogoutDialog from "@/components/AuthLogoutDialog";

export default {
  name: 'AuthSpanStatus',
  components: {
    Fragment,
    AuthButtonToggle,
    AuthLogoutDialog
  },
  mixins: [ShowSnackbarMixin],
  data() {
    return {
      logoutDialog: false
    }
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
      this.logoutDialog = false
      this.$auth.logout()
      this.showSnackbar({text: 'User logged out'})
    },
  },
}
</script>

<style scoped></style>
