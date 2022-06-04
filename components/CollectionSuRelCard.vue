<template>
  <v-col>
    <v-card
      data-cy="collection-su-rel-card"
      height="100%"
      class="mx-auto"
      outlined
    >
      <v-card-title class="text-overline mb-4" style="margin-bottom: 0; margin-top: 0; padding-top: 0; padding-bottom: 0">
          {{name}}
        <v-spacer />
        <v-tooltip
          v-if="enabled"
          bottom
        >
          <template #activator="{ on, attrs }">
            <v-btn
              data-cy="create-su-rel-btn"
              v-bind="attrs"
              icon
              x-small
              v-on="on"
              @click="$emit('create', iri)"
            >
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </template>
          <span>Add relationship</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text >
        <v-chip-group>
          <item-su-rel-chip
            v-for="item in filteredItems"
            :key="item.id"
            :enabled="enabled"
            :item="item"
            @delete="$emit('delete', $event)"
          />
        </v-chip-group>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import ItemSuRelChip from "@/components/ItemSuRelChip";
export default {
  name: "CollectionStratigraphicRelationshipCard",
  components: {
    ItemSuRelChip
  },
  props: {
    enabled: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    iri: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => item.relationship === this.iri)
    }
  }
}
</script>

<style scoped>

</style>
