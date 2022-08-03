<template>
    <v-tooltip v-if="hasWorkSite" bottom>
      <template #activator="{ on, attrs }">
        <v-toolbar-title
          v-bind="attrs"
          data-cy="work-site-title"
          class="title font-weight-black text-h4"
          v-on="on"
        >
          {{ workSite.name }}
        </v-toolbar-title>
      </template>
      <span>Current workspace</span>
    </v-tooltip>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  name: "WorkSiteContainer",
  computed: {
    ...mapState(['workSite']),
    ...mapGetters(['hasWorkSite'])
  },
}
</script>

<style scoped>

</style>
