<template>
  <v-card-text>
    <v-container>
      <v-row dense>
        <v-col>
          <p>This action will remove the link between the following resources </p>
        </v-col>
      </v-row>
      <slot />
      <v-row dense justify="center">
        <v-col class="d-flex justify-center align-center">
          <media-object-card :media="parent" />
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>

<script>
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
export default {
  name: "DeleteJoinMediaObjectCardText",
  mixins: [
    ResourceItemDataAccessorMixin
  ],
  props: {
    parent: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>

</style>
