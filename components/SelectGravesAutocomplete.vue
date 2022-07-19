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
  name: "SelectGravesAutocomplete",
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
      default: 'grave'
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
    disabled: {
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
      const response = await this.$store.dispatch('http/getGraveCodes', {area: this.area, code: this.search});
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
