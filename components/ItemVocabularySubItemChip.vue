<template>
    <v-chip
      data-cy="item-voc-chip"
      :close="enabled && $auth.hasScope('ROLE_EDITOR')"
      label
      @click:close="$emit('delete', item)"
    >
      {{vocabularyKey ? item[vocabularyKey].value : item.value}}
    </v-chip>
</template>

<script>
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";

export default {
  name: "ItemVocabularySubItemChip",
  mixins: [
    ResourceItemDataAccessorMixin
  ],
  props: {
    enabled: {
      type: Boolean,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    vocabularyKey: {
      type: String,
      default: ''
    }
  },
}
</script>
