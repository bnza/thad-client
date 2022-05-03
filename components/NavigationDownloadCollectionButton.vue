<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        :disabled="disabled"
        v-bind="attrs"
        data-cy="resource-download-btn"
        v-on="on"
        @click="$emit('click')"
      >
        <v-icon class="mx-3">mdi-download</v-icon>
      </v-btn>
    </template>
    <span>Download</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "NavigationDownloadCollectionButton",
  props: {
    disabled: {
      type: Boolean,
      required: true
    }
  }
}
</script>
