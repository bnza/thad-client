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
      const response = await this.$store.dispatch('http/getAreas');
      this.items = response.data['hydra:member'].map(item => {
        item['@code'] = `${item.site.code}.${item.code}`
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
