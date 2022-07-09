<template>
  <fragment>
    <template v-if="$auth.loggedIn">
      <v-btn
        icon
        nuxt
        to="/users/me"
      >
        <v-icon
          :color="color"
          class="mx-3"
        >
          mdi-account-circle
        </v-icon>
      </v-btn>
      <p class="text-body-2 align-center username" data-cy="logged_user">
        {{ $auth.user.email }}
      </p>
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
import {mapActions} from "vuex";
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
    ...mapActions('http',['invalidateToken']),
     login() {
       this.$router.push('/login')
    },
    async logout() {
      this.logoutDialog = false
      await this.invalidateToken(this.$store.$auth.strategy?.refreshToken.get())
      await this.$auth.logout()
      this.showSnackbar({text: 'User logged out'})
    },
  },
}
</script>

<style scoped>
  p.username {
    margin-top: 12px;
  }
</style>
