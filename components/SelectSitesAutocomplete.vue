<template>
  <v-autocomplete
    :value="select"
    :error-messages="errorMessages"
    :loading="loading"
    :items="items"
    item-text="code"
    item-value="id"
    :search-input.sync="search"
    :readonly="readonly"
    return-object
    cache-items
    flat
    hide-no-data
    label="site"
    @change="$emit('update:select', $event)"
  />
</template>

<script>
export default {
  name: "SelectSitesAutocomplete",
  props: {
    errorMessages: {
      type: Array,
      default() {
        return []
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
      // select: null,
      search: null,
      items: []
    }
  },
  async fetch() {
    this.loading = true
    try {
      const response = await this.$store.dispatch('http/getSites');
      this.items = response.data
    } catch (e) {
      await this.$store.dispatch('snackbar/requestError', e)
    } finally {
      this.loading = false
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
