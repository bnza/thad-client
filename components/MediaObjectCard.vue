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
        <v-card outlined style="background-color: rgba(0,0,0,0.7)">
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
