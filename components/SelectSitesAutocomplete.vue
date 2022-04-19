<template>
  <v-autocomplete
    v-model="select"
    :error-messages="errorMessages"
    :loading="loading"
    :items="items"
    item-text="code"
    item-value="id"
    :search-input.sync="search"
    cache-items
    flat
    hide-no-data
    label="site"
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

    }
  },
  data() {
    return {
      loading: false,
      select: null,
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
    select (id) {
      this.$emit('select', this.items.find(site => site.id === id))
    }
  }
}
</script>

<style scoped>

</style>
