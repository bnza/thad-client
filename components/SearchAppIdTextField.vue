<template>
  <v-text-field
    v-model="code"
    dense
    filled
    outlined
    rounded
    hide-details
    class="mx-4"
    style="max-width: 200px"
    placeholder="Digit code"
  />
</template>

<script>

export default {
  name: "SearchAppIdTextField",
  props: {
    filter: {
      type: String,
      default: ''
    }
  },
  computed: {
    code: {
      get() {
        return this.filter
      },
      set(value) {
        this.$emit('update:filter', value)
      }
    }
  },
}
</script>

<style scoped>

</style>
