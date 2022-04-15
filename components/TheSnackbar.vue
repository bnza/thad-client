<template>
  <v-snackbar
    app
    v-model="show"
    top
    :vertical="closeable"
    text
    outlined
    :timeout="timeout"
    :color="color"
    data-cy="the_snackbar"
  >
    {{ text }}

    <template v-if="closeable" #action="{ attrs }">
      <v-btn
        :color="color"
        text
        v-bind="attrs"
        @click="show=false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: "TheSnackbar",
  computed: {
    ...mapState('snackbar', ['text', 'color', 'timeout', 'visible']),
    ...mapGetters('snackbar', ['closeable']),
    show: {
      get() {
        return this.visible
      },
      set(visible) {
        this.setVisible(visible)
      }
    }
  },
  methods: {
    ...mapMutations('snackbar', ['setVisible'])
  }
}
</script>

<style scoped>

</style>
