<template>
  <v-autocomplete
    :value="select"
    :error-messages="errorMessages"
    :loading="loading"
    :items="items"
    item-text="@code"
    item-value="id"
    :search-input.sync="search"
    :readonly="readonly"
    :clearable="clearable"
    return-object
    cache-items
    flat
    hide-no-data
    :label="label"
    @change="$emit('update:select', $event)"
  />
</template>

<script>
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
export default {
  name: "SelectSusAutocomplete",
  mixins: [
    ResourceItemDataAccessorMixin
  ],
  props: {
    errorMessages: {
      type: Array,
      default() {
        return []
      }
    },
    label: {
      type: String,
      default: 'stratigraphic unit'
    },
    area: {
      type: Object,
      default() {
        return {};
      }
    },
    select: {
      type: Object,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      search: null,
      items: []
    }
  },
  async fetch() {
    this.loading = true
    try {
      const response = await this.$store.dispatch('http/getSus', {area: this.area});
      this.items = response.data['hydra:member'].map(item => {
        item['@code'] = this.formatCode('stratigraphicUnit', item)
        return item
      })
    } catch (e) {
      await this.$store.dispatch('snackbar/requestError', e)
    } finally {
      this.loading = false
    }
  },
  watch: {
    search (val) {
      val && val !== this.select && this.items.filter(i => {
        return (new RegExp('^'+val, 'i')).test(i['@code'])
      })
    },
  }
}
</script>

<style scoped>

</style>
