<template>
  <v-autocomplete
    clearable
    :value="select"
    :error-messages="errorMessages"
    :items="vocabulary"
    item-text="@code"
    item-value="id"
    :search-input.sync="search"
    :readonly="readonly"
    return-object
    flat
    no-data-text="Select period first"
    label="subperiod"
    @change="$emit('update:select', $event)"
  />
</template>

<script>
import {mapGetters} from "vuex";
import {clone} from "ramda";

export default {
  name: "SelectSubperiodVocabularyAutocomplete",
  props: {
    period: {
      type: Object,
      default: null
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
      if (!this.period?.id) {
        return []
      }
      const periodId = this.period.id
      let voc = clone(this.getVocabulary('subperiod'))
      voc =  voc.map(period => {
        period['@code'] = `${period.code}: ${period.value}`
        return period
      }).filter(
        _voc => _voc.period.id === periodId
      )
      return voc
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
