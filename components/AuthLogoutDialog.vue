<template>
  <div class="text-center">
    <v-dialog
      :value="dialog"
      width="500"
      persistent
    >
      <v-card>
        <v-card-title class="warning--text">
          Logout
        </v-card-title>
        <v-card-text>
          Are you sure you want to logout?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            data-cy="cancel_btn"
            text
            @click="$emit('cancel')"
        >
          Cancel
        </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            data-cy="logout-btn"
            color="warning"
            text
            @click="$emit('logout')"
          >
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "AuthLogoutDialog",
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
