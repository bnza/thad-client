<template>
  <v-icon>{{ `icon-${action}` }}</v-icon>
</template>

<script>
export default {
  name: 'AuthStatusIcon',
  props: {
    action: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped></style>
