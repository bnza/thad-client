<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
        <v-chip v-bind="attrs" small v-on="on">
          <NuxtLink :to="`${resourceBaseUrl}${itemId}`">{{ linkText }}</NuxtLink>
        </v-chip>
    </template>
    <span>Show</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "NavigationResourceItemChip",
  props: {
    resourceBaseUrl: {
      type: String,
      required: true
    },
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
