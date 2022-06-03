<template>
    <v-dialog
      :value="visible"
      width="500"
      persistent
    >
      <v-card data-cy="delete-resource-dialog-card">
        <v-card-title>
          {{ resetPasswordInfo ? 'New password' : 'Reset password' }}
        </v-card-title>
        <v-card-text>
          <v-container v-if="!resetPasswordInfo">
            <v-row>
              <v-col>
                <v-text-field
                  :value="getResponseValue('email', item)"
                  label="username"
                  readonly
                  class="mx-4"
                />
              </v-col>
            </v-row>
            <v-row justify="center" class="my-4">
              <v-icon color="error">mdi-alert</v-icon>
            </v-row>
            <v-row class="mx-4">
              Are you sure you want to reset this user password?<br />
              This action cannot be undone
            </v-row>
          </v-container>
          <v-container v-else>
            <v-row class="mx-4 pt-4">
              <v-card outlined rounded>
                <v-card-text><span id="resetPassword" class="text--secondary">{{resetPasswordInfo.password}}</span></v-card-text>
              </v-card>
            </v-row>
            <v-row class="mx-4 pt-8">
              Copy and save the new password and provide it to the user. You won’t be able to see it again!
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="mx-4">
          <v-btn
            v-if="!resetPasswordInfo"
            color="error"
            text
            data-cy="reset-btn"
            @click="submit"
          >
            Reset
          </v-btn>
          <v-btn
            v-else
            color="primary"
            text
            data-cy="copy-btn"
            @click="copy"
          >
            Copy
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            text
            data-cy="cancel-btn"
            @click="close"
          >
            {{ resetPasswordInfo ? 'Close' : 'Cancel' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import {mapState, mapGetters} from "vuex";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
import ResourceItemEditMixin from "@/mixins/ResourceItemEditMixin";
import ResourceUserGeneratePasswordMixin from "@/mixins/ResourceUserGeneratePasswordMixin";

export default {
  name: "ResetUserPasswordDialog",
  mixins: [
    ResourceItemDataAccessorMixin,
    ResourceItemEditMixin,
    ResourceUserGeneratePasswordMixin
  ],
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
  },
  fetch() {
    return true;
  },
  computed: {
    ...mapState(['resetPasswordInfo']),
    ...mapGetters('api', ['getResource']),
    item() {
      return this.user
    },
    resource() {
      return this.getResource('user')
    },
    id() {
      return this.item.id
    }
  },
  methods: {
    async copy() {
      try {
        await navigator.clipboard.writeText(this.resetPasswordInfo.password);
        await this.$store.dispatch('snackbar/show', {
          text: 'Password copied to clipboard',
          color: 'success'
        })
      } catch(e) {
        await this.$store.dispatch('snackbar/show', {
          text: e.message,
          color: 'error',
          timeout: -1
        })
      }
    },
    async navigateAfterUpdate() {
      if (this.$route.path.match(/users\/me/)) {
        return
      }
      await this.$router.replace(this.resource.itemPath(this.item.id))
    },
    close() {
      this.$emit('update:visible', false)
      if (this.resetPasswordInfo) {
        this.clearResetPasswordInfo()
      }
    }
  },
}
</script>
