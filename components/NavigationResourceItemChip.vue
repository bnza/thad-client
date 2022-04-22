<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
        <v-chip v-bind="attrs" class="font-weight-bold" v-on="on" :data-cy="`${resourceName}-navigation-chip`">
          <NuxtLink :to="getItemResourcePath(itemId)" >{{ linkText }}</NuxtLink>
        </v-chip>
    </template>
    <span>Show</span>
  </v-tooltip>
</template>

<script>
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";

export default {
  name: "NavigationResourceItemChip",
  mixins: [
    ResourceNavigationMixin
  ],
  props: {
    itemId: {
      required: true,
      validation: v => !isNaN(v) && Number.isInteger(+v)
    },
    linkText: {
      type: String,
      required: true
    }
  }
}
</script>
