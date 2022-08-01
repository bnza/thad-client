<template>
  <div>
    <v-row dense>
      <v-col>
        <v-textarea
          :value="getResponseValue('notes', item)"
          label="note"
          readonly
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          :value="getResponseValue('compiler', item)"
          label="compiler"
          readonly
        />
      </v-col>
      <v-col>
        <v-text-field
          :value="getResponseValue('date', item).substring(0,10)"
          label="date"
          readonly
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";

export default {
  name: "ReadCumulativePotterySheetCommonCard",
  mixins: [
    ResourceItemDataAccessorMixin
  ],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      panels: [
        0,1,2
      ],
    }
  }
}
</script>
