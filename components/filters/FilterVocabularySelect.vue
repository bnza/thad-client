<template>
  <v-select
    multiple
    :value="select"
    :error-messages="errorMessages"
    :items="vocabulary"
    item-text="value"
    item-value="id"
    return-object
    flat
    :label="label"
    @change="$emit('update:select', $event)"
  />
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "FilterVocabularySelect",
  props: {
    label: {
      type: String,
      required: true
    },
    errorMessages: {
      type: Array,
      default() {
        return []
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    select: {
      type: Array,
      default() {
        return [];
      }
    },
    vocabularyName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      search: null,
      items: []
    }
  },
  computed: {
    ...mapGetters('vocabularies', ['getVocabulary']),
    vocabulary() {
      return this.getVocabulary(this.vocabularyName)
    }
  },
}
</script>

<style scoped>

</style>
