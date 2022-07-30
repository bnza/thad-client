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
  name: "SelectUnionResourceAutocomplete",
  props: {
    errorMessages: {
      type: Array,
      default() {
        return []
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
  fetch() {
    throw new Error('You must implement this method')
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
