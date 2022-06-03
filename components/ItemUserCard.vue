<template>
  <v-card data-cy="item-user-card">
    <v-toolbar flat>
      <navigation-prev-button />
      <v-toolbar-title>User</v-toolbar-title>
    </v-toolbar>
    <read-user-card v-if="ready" :item="item"/>
    <lazy-change-user-password-dialog :visible.sync="dialogVisible" />
    <reset-user-password-dialog
      v-if="resettingUser"
      :resource-name="resourceName"
      :user="resettingUser"
      :visible.sync="resetDialog"
    />
    <delete-resource-dialog
      v-if="deletingItem"
      :resource-name="resourceName"
      :visible.sync="deleteDialog"
      :item="deletingItem"
      @itemDeleted="resetAndFetch"
    >
      <delete-area-card-text :item="deletingItem" />
    </delete-resource-dialog>
  </v-card>
</template>

<script>
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import ResourceItemGetMixin from "@/mixins/ResourceItemGetMixin";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
import resourceUserResetPasswordMixin from "@/mixins/ResourceUserResetPasswordMixin";


export default {
  name: "ItemUserCard",
  mixins: [
    ResourceItemGetMixin,
    ResourceItemDataAccessorMixin,
    ResourceDeleteDialogMixin,
    resourceUserResetPasswordMixin
  ],
  data() {
    return {
      dialogVisible: false
    }
  },
  watch: {
    resetPasswordInfo: {
      handler(user) {
        if (user && user.password) {
          this.openResetDialog(user)
        }
      },
      immediate: true
    }
  }
}
</script>
