<template>
  <v-dialog
    v-if="media"
    :value="!!media"
    persistent
    fullscreen
  >
    <v-card>
      <v-card-actions>
        <v-row class="mt-16">
          <v-spacer />
          <v-btn
            color="primary"
            text
            :href="mediaUrl"
            :download="originalFilename"
            target="_blank"
            data-cy="resource-download-btn"
          >
            Download
          </v-btn>
          <v-spacer />
          <v-btn
            text
            data-cy="cancel-btn"
            @click="$emit('close')"
          >
            Close
          </v-btn>
          <v-spacer />
        </v-row>
      </v-card-actions>
      <v-card-text>
        <v-row>
          <v-spacer />
          <v-col>
            <v-img
              v-if="hasThumbnail"
              class="my-16"
              :lazy-src="documentThumbnail"
              :src="mediaUrl"
              min-width="512"
              min-height="512"
              :max-width="maxWidth"
              :width="width"
              :height="height"
              contain
            />
          </v-col>
          <v-spacer />
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import ResourceMediaObjectMixin from "@/mixins/ResourceMediaObjectMixin";
export default {
  name: "MediaObjectPreviewDialog",
  mixins: [
    ResourceMediaObjectMixin
  ],
  props: {
    media: {
      type: Object,
      default: null
    }
  },
  computed: {
    maxWidth() {
      return Math.max(window.innerWidth-(24*2), 512)
    },
    maxHeight() {
      return Math.max(window.innerHeight-(24*2), 512)
    },
    width() {
      return this.media.mediaObject.dimensions[0]
    },
    height() {
      return this.media.mediaObject.dimensions[1]
    }
  }
}
</script>

<style scoped>

</style>
