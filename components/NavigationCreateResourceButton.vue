<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        nuxt
        icon
        v-bind="attrs"
        :disabled="disabled"
        data-cy="resource-create-btn"
        @click="navigate"
        v-on="on"
      >
        <v-icon class="mx-3">mdi-plus</v-icon>
      </v-btn>
    </template>
    <span>New</span>
  </v-tooltip>
</template>

<script>
import {mapMutations} from "vuex";
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
import ResourceCollectionParentMixin from "~/mixins/ResourceCollectionParentMixin";
export default {
  name: "NavigationCreateResourceButton",
  mixins: [
    ResourceNavigationMixin,
    ResourceCollectionParentMixin
  ],
  props: {
    disabled: {
      type: Boolean,
      required: true
    },
  },
  methods: {
    ...mapMutations(['setCreatingResourceParent']),
    navigate() {
      if (this.parent) {
        this.setCreatingResourceParent(this.parent)
      }
      this.$router.push(this.createResourcePath)
    }
  }
}
</script>

<style scoped>

</style>
