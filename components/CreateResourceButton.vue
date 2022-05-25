<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        nuxt
        icon
        v-bind="attrs"
        :disabled="disabled"
        data-cy="resource-create-btn"
        @click="openDialog"
        v-on="on"
      >
        <v-icon class="mx-3">mdi-plus</v-icon>
      </v-btn>
    </template>
    <span>New</span>
  </v-tooltip>
</template>

<script>
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";

export default {
  name: "CreateResourceButton",
  mixins: [
    ResourceNavigationMixin,
  ],
  props: {
    disabled: {
      type: Boolean,
      required: true
    },
  },
  methods: {
    openDialog(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style scoped>

</style>
