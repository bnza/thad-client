<template>
  <v-snackbar
    v-model="show"
    app
    top
    :vertical="closeable"
    text
    outlined
    :timeout="timeout"
    :color="color"
    data-cy="the_snackbar"
  >
    <div v-for="(line, i) in text.split('\n')" :key="i">
      {{ line }}
    </div>
    <template v-if="closeable" #action="{ attrs }">
      <v-btn
        :color="color"
        text
        data-cy="snackbar-close-btn"
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
