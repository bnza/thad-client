<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        :href="mediaUrl"
        :download="originalFilename"
        target="_blank"
        data-cy="resource-download-btn"
        v-on="on"
      >
        <v-icon class="mx-3">mdi-download</v-icon>
      </v-btn>
    </template>
    <span>Download</span>
  </v-tooltip>
</template>

<script>
import ResourceMediaObjectMixin from "@/mixins/ResourceMediaObjectMixin";
export default {
  name: "NavigationDownloadImageButton",
  mixins: [
    ResourceMediaObjectMixin
  ]
}
</script>
