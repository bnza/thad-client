<template>
  <v-dialog
    :value="visible"
    width="500"
    persistent
  >
    <v-card flat data-cy="change-user-password-dialog-card">
      <v-card-title flat>
        Change password
      </v-card-title>
    </v-card>
    <v-card-text>
      <v-container>
        <p class="mx-4">Fill the form to change current user's password</p>
        <v-form lazy-validation novalidate>
        <v-row dense>
          <v-col data-cy="old-password-input-col">
            <v-text-field
              v-model="modelItem.oldPassword"
              :append-icon="show[0] ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show[0] || !modelItem.oldPassword ? 'text' : 'password'"
              autocomplete="new-password"
              label="old password"
              required
              :readonly="readonly[0]"
              :error-messages="oldPasswordErrors"
              class="mx-4"
              @click:append="toggleView(0)"
              @input="$v.modelItem.oldPassword.$touch()"
              @blur="setReadonly(0)"
              @focus="setWritable(0)"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col data-cy="password-input-col">
            <v-text-field
              v-model="modelItem.password"
              autocomplete="new-password"
              :append-icon="show[1] ? 'mdi-eye' : 'mdi-eye-off'"
              :type="(show[1] || !modelItem.password) ? 'text' : 'password'"
              label="new password"
              required
              :error-messages="passwordErrors"
              class="mx-4"
              @click:append="toggleView(1)"
              @input="$v.modelItem.password.$touch()"
            />
          </v-col>
        </v-row>
        <v-row desnse>
          <v-col data-cy="repeat-password-input-col">
            <v-text-field
              v-model="modelItem.repeatPassword"
              :append-icon="show[2] || !modelItem.repeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show[2] ? 'text' : 'password'"
              label="repeat password"
              required
              :readonly="readonly[2]"
              :error-messages="repeatPasswordErrors"
              class="mx-4"
              @click:append="toggleView(2)"
              @input="$v.modelItem.repeatPassword.$touch()"
              @blur="setReadonly(2)"
              @focus="setWritable(2)"
            />
          </v-col>
        </v-row>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        text
        data-cy="submit-btn"
        @click="submit"
      >
        Submit
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        text
        data-cy="cancel-btn"
        @click="close"
      >
        Cancel
      </v-btn>
    </v-card-actions>
  </v-dialog>
</template>

<script>
import Vue from "vue";
import {mapActions, mapGetters} from "vuex";
import ChangeUserPasswordValidationMixin from "@/mixins/validation/ChangeUserPasswordValidationMixin";


export default {
  name: "ChangeUserPasswordDialog",
  mixins: [
    ChangeUserPasswordValidationMixin,
  ],
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      modelItem: {
      },
      show: [false, false, false],
      readonly: [true, true, true]
    }
  },
  computed: {
    ...mapGetters('api', ['getResource']),
    resource() {
      return this.getResource('user')
    }
  },
  methods: {
    ...mapActions('http', [
      'request',
    ]),
    close() {
      this.$emit('update:visible', false)
    },
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        await this.request({
          method: 'patch',
          url: this.resource.itemUrl(this.$auth.user.id),
          data: {
            oldPassword: this.modelItem.oldPassword,
            password: this.modelItem.password
          },
          headers: {
            Accept: 'application/ld+json',
            'Content-Type':'application/merge-patch+json'
          }
        })
        await this.$store.dispatch('snackbar/show', {
          text: 'Successfully changed user\'s password',
          color: 'success'
        })
        await this.$auth.loginWith('local', { data: {username: this.$auth.user.email, password: this.modelItem.password} })
        this.close()
        this.modelItem = {}
      } catch (e) {
        await this.$store.dispatch('snackbar/requestError', e)
      }
    },
    toggleView(i) {
      Vue.set(this.show, i, !this.show[i])
    },
    setWritable(i) {
      Vue.set(this.readonly, i, false)
    },
    setReadonly(i) {
      Vue.set(this.readonly, i, true)
    },
  }
}
</script>

<style scoped>

</style>
