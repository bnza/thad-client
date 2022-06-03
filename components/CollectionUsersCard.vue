<template>
  <v-card data-cy="collection-users-card">
    <v-toolbar flat dense>
      <v-toolbar-title v-if="!isChild">Users</v-toolbar-title>
      <v-spacer />
      <navigation-create-resource-button
        v-if="$auth.hasScope('ROLE_ADMIN')"
        :parent="parent"
        :resource-name="resourceName"
        :disabled="false"
      />
    </v-toolbar>
    <v-data-table
      multi-sort
      dense
      :headers="[
      {
        text: 'actions',
        value: 'id',
        align: 'center'
      },
      {
        text: 'username',
        value: 'email',
        align: 'left'
      },
      {
        text: 'roles',
        value: 'roles',
        align: 'left'
      },
    ]"
      :items="items"
      :options.sync="pagination"
      :server-items-length="totalItems"
    >
      <template #[`item.id`]="{ item : tItem }">
        <navigation-resource-item-crud
          :item-id="tItem.id"
          :resource-name="resourceName"
          :force-disable="tItem.email === $auth.user.email"
          @delete="openDeleteDialog(tItem)"
        >
          <reset-password-button
            :user="tItem"
            :disabled="tItem.email === $auth.user.email"
            @click="clearAndOpenResetDialog(tItem)"
          />
        </navigation-resource-item-crud>
      </template>
      <template #[`item.roles`]="{ item : tItem }">
        <v-icon :color="color(tItem.roles)" class="mr-4">mdi-account-circle</v-icon>{{getRole(tItem.roles)}}
      </template>
    </v-data-table>
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
      <delete-user-card-text :item="deletingItem" />
    </delete-resource-dialog>
  </v-card>
</template>

<script>
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";
import ResourceCollectionGetMixin from "@/mixins/ResourceCollectionGetMixin";
import ResourceUserResetPasswordMixin from "@/mixins/ResourceUserResetPasswordMixin";
import {roleColor} from "@/src/utils";

export default {
  name: "CollectionUsersCard",
  mixins: [
    ResourceDeleteDialogMixin,
    ResourceCollectionGetMixin,
    ResourceUserResetPasswordMixin
  ],
  methods: {
    color(roles) {
      return roleColor(this.getRole(roles))
    },
    getRole(roles) {
      if (roles.includes('ROLE_ADMIN')) {
        return 'ROLE_ADMIN'
      }
      if (roles.includes('ROLE_EDITOR')) {
        return 'ROLE_EDITOR'
      }
      return 'ROLE_USER'
    },
  }
}
</script>
