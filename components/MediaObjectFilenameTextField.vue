<template>
  <div>
    <v-text-field
      :value="originalFilename"
      label="filename"
      readonly
    >
      <template #prepend>
        <lazy-navigation-download-image-button :media="media" />
      </template>
    </v-text-field>
  </div>
</template>

<script>
import ResourceMediaObjectMixin from "@/mixins/ResourceMediaObjectMixin";
export default {
  name: "MediaObjectFilenameTextField",
  mixins: [
    ResourceMediaObjectMixin
  ],
}
</script>

<style scoped>

</style>
