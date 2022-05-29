<template>
  <v-dialog
    :value="visible"
    width="500"
    persistent
  >
    <v-card data-cy="delete-resource-dialog-card">
      <v-card-title>
        Change password
      </v-card-title>
    </v-card>
    <v-card-text>
      <v-container>
        <v-form lazy-validation novalidate autocomplete="off">
        <v-row dense>
          <v-col>
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
          <v-col>
            <v-text-field
              v-model="modelItem.newPassword"
              autocomplete="new-password"
              :append-icon="show[1] ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show[1] || !modelItem.newPassword ? 'text' : 'password'"
              label="new password"
              required
              :readonly="readonly[1]"
              :error-messages="newPasswordErrors"
              class="mx-4"
              @click:append="toggleView(1)"
              @input="$v.modelItem.newPassword.$touch()"
              @blur="setReadonly(1)"
              @focus="setWritable(1)"
            />
          </v-col>
        </v-row>
        <v-row desnse>
          <v-col>
            <v-text-field
              v-model="modelItem.repeatPassword"
              autocomplete="new-password"
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
import {clone} from "ramda";
import {mapActions} from "vuex";
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
          method: 'post',
          url: 'api/me/change-password',
          data: clone(this.modelItem),
          headers: {
            Accept: 'application/ld+json'
          },
        })
        await this.$store.dispatch('snackbar/show', {
          text: 'Successfully changed user\'s password',
          color: 'success'
        })
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
