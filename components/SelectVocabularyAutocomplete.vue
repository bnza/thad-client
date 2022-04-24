<template>
  <v-autocomplete
    :value="select"
    :error-messages="errorMessages"
    :items="vocabulary"
    item-text="value"
    item-value="id"
    :search-input.sync="search"
    :readonly="readonly"
    return-object
    cache-items
    flat
    hide-no-data
    :label="label"
    @change="$emit('update:select', $event)"
  />
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "SelectVocabularyAutocomplete",
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
      type: Object,
      default() {
        return {};
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
  watch: {
    search (val) {
      val && val !== this.select && this.items.filter(i => {
        return (new RegExp('^'+val, 'i')).test(i.code)
      })
    },
  }
}
</script>

<style scoped>

</style>
