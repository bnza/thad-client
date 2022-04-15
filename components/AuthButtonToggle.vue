<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" data-cy="auth_btn" @click.stop="$emit(toggleAction)">
        <v-icon>{{ `mdi-${toggleAction}` }}</v-icon>
      </v-btn>
    </template>
    <span>{{ capitalize(toggleAction) }}</span>
  </v-tooltip>
</template>

<script>
import { capitalize } from '@/src/utils'

export default {
  name: 'AuthButtonToggle',
  props: {
    loggedIn: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    toggleAction() {
      return this.loggedIn ? 'logout' : 'login'
    },
  },
  methods: {
    capitalize,
  },
}
</script>

<style scoped></style>
