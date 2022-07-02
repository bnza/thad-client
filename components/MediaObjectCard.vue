<template>
  <v-card
    max-width="258px"
    flat
    outlined
    data-cy="media-object-card"
  >
    <v-img
      :src="thumbnailUrl"
      :class="`white--text align-end`"
      width="256px"
      height="256px"
      max-width="256px"
      max-height="256px"
      style="background-color: white"
    >
      <template #placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
      <v-card-text class="caption">
        <v-btn
          v-if="hasThumbnail"
          outlined
          height="256px"
          width="256px"
          class="transparent"
          @click="$emit('click', previewMediaUrl)"
        />
        <v-card v-if="documentId" outlined style="background-color: rgba(0,0,0,0.7)" class="secondary--text font-weight-bold">
          {{documentId}}
        </v-card>
        <v-card v-else outlined style="background-color: rgba(0,0,0,0.7)">
          {{originalFilename}}
        </v-card>
      </v-card-text>
    </v-img>
    <v-card-actions>
      <v-spacer></v-spacer>
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
import ResourceMediaObjectMixin from "@/mixins/ResourceMediaObjectMixin";
export default {
  name: "MediaObjectCard",
  mixins: [
    ResourceMediaObjectMixin
  ]
}
</script>

<style scoped>

</style>
