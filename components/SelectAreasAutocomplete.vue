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
    return-object
    cache-items
    flat
    hide-no-data
    label="area"
    @change="$emit('update:select', $event)"
  />
</template>

<script>
export default {
  name: "SelectAreasAutocomplete",
  props: {
    errorMessages: {
      type: Array,
      default() {
        return []
      }
    },
    site: {
      type: Object,
      default() {
        return {};
      }
    },
    select: {
      type: Object,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
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
      const response = await this.$store.dispatch('http/getAreaCodes', {code: this.search});
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
