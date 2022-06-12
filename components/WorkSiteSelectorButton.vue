<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        nuxt
        icon
        v-bind="attrs"
        data-cy="work-site-btn"
        :disabled="hasWorkSite"
        v-on="on"
        @click="openDialog"
      >
        <v-icon color="primary" class="mx-3">mdi-bullseye</v-icon>
      </v-btn>
    </template>
    <span>Set as work site</span>
  </v-tooltip>
</template>

<script>
import {mapMutations, mapGetters} from "vuex";

export default {
  name: "WorkSiteSelectorButton",
  props: {
    site: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['hasWorkSite'])
  },
  methods: {
    ...mapMutations(['setProposedWorkSite', 'setWorkSiteDialog']),
    openDialog() {
      this.setProposedWorkSite(this.site)
      this.setWorkSiteDialog(true)
    }
  }
}
</script>

<style scoped>

</style>
