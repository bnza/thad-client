<template>
  <collection-sus-card resource-name="stratigraphic_units"/>
</template>

<script>
import ResourceCollectionGetMixin from "@/mixins/ResourceCollectionGetMixin";
import CollectionSusCard from "@/components/CollectionSusCard";

export default {
  name: "IndexSusPage",
  components: {
    CollectionSusCard
  },
  mixins: [
    ResourceCollectionGetMixin
  ],
}
</script>
