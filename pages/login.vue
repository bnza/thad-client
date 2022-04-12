<template>
  <v-card class="pa-md-4 mx-auto" width="400px">
    <v-card-title color="secondary"> Login </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="form.username"
          :error-messages="emailErrors"
          label="email"
          required
          @input="$v.form.username.$touch()"
          @blur="$v.form.username.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          :error-messages="passwordErrors"
          type="password"
          label="password"
          required
          @input="$v.form.password.$touch()"
          @blur="$v.form.password.$touch()"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn class="mr-4" @click="userLogin" :disabled="$v.$invalid">
        login
      </v-btn>
      <v-btn nuxt @click="goToPrev"> cancel </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import loginFormValidationMixin from "@/mixins/validation/loginFormValidationMixin";

export default {
  name: 'LoginPage',
  mixins: [loginFormValidationMixin],
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
        try {
          await this.$auth.loginWith('local', { data: this.form })
        } catch (err) {
          console.log(err)
        }
      }
    },
  },
}
</script>

<style scoped></style>
