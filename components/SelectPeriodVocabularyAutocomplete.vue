<template>
  <v-autocomplete
    :value="select"
    :error-messages="errorMessages"
    :items="vocabulary"
    item-text="@code"
    item-value="id"
    :search-input.sync="search"
    :readonly="readonly"
    return-object
    cache-items
    flat
    hide-no-data
    label="period"
    @change="$emit('update:select', $event)"
  />
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "SelectPeriodVocabularyAutocomplete",
  props: {
    subPeriods: {
      type: Boolean,
      default: true
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
      let voc = this.getVocabulary('period')
      if (!voc) {
        return []
      }
      if (!this.subPeriods) {
        voc = voc.filter(period => period.parent === null)
      }
      return voc.map(period => {
        period['@code'] = `${period.code}: ${period.value}`
        return period
      })
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
