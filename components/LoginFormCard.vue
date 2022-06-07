<template>
  <v-card class="pa-md-4 mx-auto" width="400px">
    <v-card-title color="secondary"> Login </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="form.username"
          :error-messages="emailErrors"
          label="email"
          data-cy="username"
          required
          @input="$v.form.username.$touch()"
          @blur="$v.form.username.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          :error-messages="passwordErrors"
          type="password"
          label="password"
          data-cy="password"
          required
          @input="$v.form.password.$touch()"
          @blur="$v.form.password.$touch()"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn class="mr-4" :disabled="$v.$invalid" data-cy="submit" @click="userLogin">
        login
      </v-btn>
      <v-btn nuxt @click="goToPrev"> cancel </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ShowSnackbarMixin from "@/mixins/ShowSnackbarMixin";
import LoginFormValidationMixin from "@/mixins/validation/LoginFormValidationMixin";

export default {
  name: 'LoginFormCard',
  mixins: [LoginFormValidationMixin, ShowSnackbarMixin],
  data: () => {
    return {
      form: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    goToPrev() {
      this.$router.push('/')
    },
    async userLogin() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const snackbar = {
          color: 'success',
        }
        try {
          await this.$auth.loginWith('local', { data: this.form })
          snackbar.text = `User ${this.$auth.user.email} logged in`
        } catch (err) {
          snackbar.timeout = -1
          snackbar.color = 'error'
          snackbar.text = 'Login failed'
        } finally {
          this.showSnackbar(snackbar)
        }
      }
    },
  },
}
</script>

<style scoped></style>
