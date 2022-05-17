<template>
  <div class="px-6">
    <v-row dense>
      <v-col>
        <v-text-field
          v-if="ready"
          class="secondary--text font-weight-bold" color="secondary"
          :value="formatCode('cumulativePotterySheet', item)"
          label="code"
          readonly
        />
      </v-col>
      <v-col>
        <v-text-field
          :value="formatCode('stratigraphicUnit', item.stratigraphicUnit)"
          label="SU"
          readonly
        />
      </v-col>
      <v-col>
        <v-text-field
          class="secondary--text font-weight-bold" color="secondary"
          :value="getResponseValue('number', item)"
          label="identification number"
          readonly
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          :value="getResponseValue('cumulativeWareCount', item)"
          label="total sherd count"
          readonly
        />
      </v-col>
      <v-col />
      <v-col />
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          :value="getResponseValue('commonWareDiagnosticCount', item)"
          label="common ware diagnostic sherd count"
          readonly
        />
      </v-col>
      <v-col>
        <v-text-field
          :value="getResponseValue('commonWareNonDiagnosticCount', item)"
          label="common ware non diagnostic sherd count"
          readonly
        />
      </v-col>
      <v-col />
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          :value="getResponseValue('fireWareDiagnosticCount', item)"
          label="fire ware diagnostic sherd count"
          readonly
        />
      </v-col>
      <v-col>
        <v-text-field
          :value="getResponseValue('fireWareNonDiagnosticCount', item)"
          label="fire ware non diagnostic sherd count"
          readonly
        />
      </v-col>
      <v-col />
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          :value="getResponseValue('coarseWareDiagnosticCount', item)"
          label="coarse ware diagnostic sherd count"
          readonly
        />
      </v-col>
      <v-col>
        <v-text-field
          :value="getResponseValue('coarseWareNonDiagnosticCount', item)"
          label="coarse ware non diagnostic sherd count"
          readonly
        />
      </v-col>
      <v-col />
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          :value="getResponseValue('kitchenWareDiagnosticCount', item)"
          label="kitchen ware diagnostic sherd count"
          readonly
        />
      </v-col>
      <v-col>
        <v-text-field
          :value="getResponseValue('kitchenWareNonDiagnosticCount', item)"
          label="kitchen ware non diagnostic sherd count"
          readonly
        />
      </v-col>
      <v-col />
    </v-row>
  </div>
</template>

<script>
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";

export default {
  name: "ReadCumulativePotterySheetWareCard",
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
