<template>
  <fragment v-if="workSite.id">
    <v-spacer/>
    <v-tooltip bottom >
      <template #activator="{ on, attrs }">
        <v-toolbar-title
          v-bind="attrs"
          data-cy="work-site-title"
          class="title font-weight-bold"
          v-on="on"
        >
          {{ workSite.name }}
        </v-toolbar-title>
      </template>
      <span>Current workspace</span>
    </v-tooltip>
    <v-tooltip bottom >
      <template #activator="{ on, attrs }">
        <v-btn
          nuxt
          icon
          x-small
          v-bind="attrs"
          data-cy="work-site-btn"
          color="grey"
          v-on="on"
          @click="setWorkSite({})"
        >
          <v-icon class="mx-3">mdi-close-circle-outline</v-icon>
        </v-btn>
      </template>
      <span>Work on the whole dataset</span>
    </v-tooltip>
  </fragment>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import { Fragment } from 'vue-frag'

export default {
  name: "WorkSiteContainer",
  components: {
    Fragment
  },
  computed: {
    ...mapState(['workSite'])
  },
  methods: {
    ...mapMutations(['setWorkSite'])
  }
}
</script>

<style scoped>

</style>
