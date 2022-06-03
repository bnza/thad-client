<template>
  <v-card data-cy="item-user-me-card">
    <v-toolbar flat>
      <navigation-prev-button />
      <v-toolbar-title>User</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-container>
        <v-row dense>
          <v-col>
            <v-text-field
              :value="$auth.user.email"
              label="username"
              readonly
              class="mx-4"
            />
          </v-col>
          <v-col>
            <v-text-field
              :color="color"
              :value="$auth.user.roles[0]"
              prepend-icon="mdi-account-circle"
              label="role"
              readonly
              class="mx-4"
            />
          </v-col>
          <v-col>
            <v-btn
              data-cy="open-dialog-btn"
              color="primary"
              @click="dialogVisible=true"
            >
              Change password
            </v-btn>
          </v-col>
          <v-col />
        </v-row>
      </v-container>
    </v-card-text>
    <lazy-change-user-password-dialog :visible.sync="dialogVisible" />
  </v-card>
</template>

<script>
import {roleColor} from "@/src/utils";
export default {
  name: "ItemUserMeCard",
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    color() {
      return roleColor(this.$auth.user?.roles[0])
    }
  }
}
</script>

<style scoped>

</style>
