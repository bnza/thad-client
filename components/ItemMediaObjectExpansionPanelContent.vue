<template>
  <v-expansion-panel-content>
    <v-row>
      <v-spacer />
      <v-col>
        <media-object-filename-text-field :media="item" />
      </v-col>
      <v-spacer />
    </v-row>
    <v-row>
      <v-spacer />
      <v-col>
        <item-document-thumbnail-image
          style="margin: auto"
          :media="item"
          :height="256"
          :width="256"
          @click="$emit('click')"
        />
      </v-col>
      <v-spacer />
    </v-row>
  </v-expansion-panel-content>
</template>

<script>
export default {
  name: "ItemMediaObjectExpansionPanelContent",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
