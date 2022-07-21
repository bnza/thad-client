<template>
  <v-chip
    data-cy="item-rel-chip"
    :close="enabled && $auth.hasScope('ROLE_EDITOR')"
    label
    @click:close="$emit('delete', item)"
  >
    {{code}}
  </v-chip>
</template>
<script>
import ItemSubItemChip from "@/components/ItemSubItemChip";

export default {
  name: "ItemSubItemBuildingRoomChip",
  extends: ItemSubItemChip,
  computed: {
    code() {
      const chunks = [this.item.building]
      if (this.item.room) {
        chunks.push(this.item.room)
      }
      return this.item ? chunks.join(' / ') : undefined
    }
  },
}
</script>
