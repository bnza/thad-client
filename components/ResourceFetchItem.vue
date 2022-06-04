<template>
  <div>
    <slot :resource-name="resourceName" :item="item" :ready="ready"/>
  </div>
</template>
<script>
import ResourceItemGetMixin from "@/mixins/ResourceItemGetMixin";
export default {
  name: "ResourceFetchItem",
  mixins: [
    ResourceItemGetMixin
  ],
  props: {
    itemId: {
      type: String,
      required: true
    }
  },
  computed: {
    id() {
      return this.itemId
    }
  }
}
</script>

<style scoped>

</style>
