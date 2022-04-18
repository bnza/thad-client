<template>
  <collection-sus-card />
</template>

<script>
import RouteResourceCollectionTableMixin from "@/mixins/RouteResourceCollectionTableMixin";
import CollectionSusCard from "@/components/CollectionSusCard";

export default {
  name: "IndexSusPage",
  components: {
    CollectionSusCard
  },
  mixins: [
    RouteResourceCollectionTableMixin
  ],
  computed: {
    resourceName() {
      return 'stratigraphic_units'
    }
  }
}
</script>
