<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        nuxt
        icon
        v-bind="attrs"
        data-cy="work-site-btn"
        v-on="on"
        @click="setWorkSite(site)"
      >
        <v-icon color="primary" class="mx-3">mdi-bullseye</v-icon>
      </v-btn>
    </template>
    <span>Set as work site</span>
  </v-tooltip>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "WorkSiteSelectorButton",
  props: {
    site: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapMutations(['setWorkSite'])
  }
}
</script>

<style scoped>

</style>
