<template>
  <v-card-text>
    <v-container>
      <delete-su-card-text :item="parent" />
      <v-row dense justify="center">
        <v-col class="d-flex justify-center align-center">
          <media-object-card  :media="item" />
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
