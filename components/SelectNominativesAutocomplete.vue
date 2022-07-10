<template>
  <v-combobox
    :value="select"
    :error-messages="errorMessages"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    :readonly="readonly"
    :disabled="disabled"
    flat
    :label="label"
    @change="$emit('update:select', $event)"
  />
</template>

<script>
export default {
  name: "SelectNominativesAutocomplete",
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
      validator(v) {
        return typeof v === 'string' || undefined === v
      },
      default: undefined
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
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
      const response = await this.$store.dispatch('http/getNominatives', {
        apiPrefix: this.$config.apiPrefix,
        search: this.search
      });
      this.items = response.data.filter(v => v !== null).map(item => item.name)
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
