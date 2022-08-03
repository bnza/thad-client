<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        nuxt
        icon
        v-bind="attrs"
        data-cy="work-site-btn"
        v-on="on"
        @click="openDialog"
      >
        <v-icon color="primary" class="mx-3">{{icon}}</v-icon>
      </v-btn>
    </template>
    <span>{{span}}</span>
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
    ...mapGetters(['hasWorkSite']),
    icon() {
      return this.hasWorkSite ? 'mdi-checkbox-blank-circle-outline' : 'mdi-bullseye'
    },
    span() {
      return this.hasWorkSite ? 'Work with the whole dataset' : 'Set as work site'
    }
  },
  methods: {
    ...mapMutations(['setProposedWorkSite', 'setWorkSiteDialog']),
    openDialog() {
      const site = this.hasWorkSite ? {} : this.site
      this.setProposedWorkSite(site)
      this.setWorkSiteDialog(true)
    }
  }
}
</script>

<style scoped>

</style>
