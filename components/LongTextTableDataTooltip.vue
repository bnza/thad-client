<template>
  <v-tooltip v-if="text && text.length > 30" bottom>
    <template #activator="{ on, attrs }">
      <span
        v-bind="attrs"
        data-cy="long-text-td"
        v-on="on"
      >
        {{truncatedText}}
      </span>
    </template>
    <span>{{text}}</span>
  </v-tooltip>
  <span v-else-if="text">{{text}}</span>
</template>

<script>
export default {
  name: "LongTextTableDataTooltip",
  props: {
    text: {
      type: String,
      default: null
    }
  },
  computed: {
    truncatedText() {
      return this.text?.length > 30 ? `${this.text.substring(0,30)}...` : this.text
    }
  }
}
</script>

<style scoped>

</style>
