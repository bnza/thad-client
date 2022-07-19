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
    :disabled="disabled"
    :clearable="clearable"
    :return-object="returnObject"
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
      validator(value) {
        return value ? typeof value === 'object' || typeof value === 'number' : true
      },
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    returnObject: {
      type: Boolean,
      default: true
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
      const response = await this.$store.dispatch('http/getSuCodes', {area: this.area, code: this.search});
      this.items = response.data['hydra:member'].map(item => {
        item['@code'] = item.appId.code
        return item
      })
    } catch (e) {
      await this.$store.dispatch('snackbar/requestError', e)
    } finally {
      this.loading = false
    }
  },
  watch: {
    search () {
      this.$fetch()
    },
  }
}
</script>

<style scoped>

</style>
