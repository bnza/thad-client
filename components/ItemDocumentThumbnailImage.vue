<template>
    <v-img
      class="my-2"
      :lazy-src="documentThumbnail"
      :height="height"
      :width="width"
      :src="thumbnailUrl"
    >
      <v-btn
        v-if="hasThumbnail"
        outlined
        :height="height"
        :width="width"
        class="transparent"
        @click="$emit('click', previewMediaUrl)"
      />
    </v-img>
</template>

<script>
import ResourceMediaObjectMixin from "@/mixins/ResourceMediaObjectMixin";
export default {
  name: "ItemDocumentThumbnailImage",
  mixins: [
    ResourceMediaObjectMixin
  ],
  props: {
    height: {
      type: Number,
      default: 128
    },
    width: {
      type: Number,
      default: 128
    }
  }
}
</script>
