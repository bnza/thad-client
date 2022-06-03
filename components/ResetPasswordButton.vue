<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        nuxt
        icon
        v-bind="attrs"
        data-cy="reset-password-btn"
        v-on="on"
        :disabled="disabled"
        @click="$emit('click')"
      >
        <v-icon color="primary" class="mx-3">mdi-lock-reset</v-icon>
      </v-btn>
    </template>
    <span>Reset user's password</span>
  </v-tooltip>
</template>

<script>

export default {
  name: "ResetPasswordButton",
  props: {
    user: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
}
</script>

<style scoped>

</style>
