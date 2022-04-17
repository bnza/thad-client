<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        nuxt
        icon
        v-bind="attrs"
        @click="$router.go(-1)"
        v-on="on"
      >
        <v-icon color="primary" class="mx-3">mdi-arrow-left</v-icon>
      </v-btn>
    </template>
    <span>Back</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "NavigationPrevButton"
}
</script>

<style scoped>

</style>
