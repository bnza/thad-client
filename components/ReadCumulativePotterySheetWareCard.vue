<template>
  <div class="px-6">
    <v-row dense>
      <p class="mx-2 mt-4 grey--text text-overline">Sherd count by ware</p>
    </v-row>
    <v-row dense>
      <v-col sm="3">
        <v-text-field
          :value="getResponseValue('cumulativeWareCount', item)"
          label="total sherd count"
          readonly
        />
      </v-col>
      <v-col sm="3">
        <v-text-field
          :value="wareTypeDiagnosticCount"
          label="diagnostic sherd count by ware"
          readonly
        >
          <template v-if="countWarning" #append-outer>
            <diagnostic-sherd-count-alert
              :period-diagnostic-count="item.diagnosticWareCount"
              :ware-diagnostic-count="wareTypeDiagnosticCount"
              />
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col sm="3">
        <v-text-field
          :value="getResponseValue('commonWareDiagnosticCount', item)"
          label="common ware diagnostic sherd count"
          readonly
        />
      </v-col>
      <v-col sm="3">
        <v-text-field
          :value="getResponseValue('commonWareNonDiagnosticCount', item)"
          label="common ware non diagnostic sherd count"
          readonly
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col sm="3">
        <v-text-field
          :value="getResponseValue('fineWareDiagnosticCount', item)"
          label="fine ware diagnostic sherd count"
          readonly
        />
      </v-col>
      <v-col sm="3">
        <v-text-field
          :value="getResponseValue('fineWareNonDiagnosticCount', item)"
          label="fine ware non diagnostic sherd count"
          readonly
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col sm="3">
        <v-text-field
          :value="getResponseValue('coarseWareDiagnosticCount', item)"
          label="coarse ware diagnostic sherd count"
          readonly
        />
      </v-col>
      <v-col sm="3">
        <v-text-field
          :value="getResponseValue('coarseWareNonDiagnosticCount', item)"
          label="coarse ware non diagnostic sherd count"
          readonly
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col sm="3">
        <v-text-field
          :value="getResponseValue('kitchenWareDiagnosticCount', item)"
          label="kitchen ware diagnostic sherd count"
          readonly
        />
      </v-col>
      <v-col sm="3">
        <v-text-field
          :value="getResponseValue('kitchenWareNonDiagnosticCount', item)"
          label="kitchen ware non diagnostic sherd count"
          readonly
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
import DiagnosticSherdCountWarningMixin from "@/mixins/DiagnosticSherdCountWarningMixin";

export default {
  name: "ReadCumulativePotterySheetWareCard",
  mixins: [
    DiagnosticSherdCountWarningMixin,
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
  },
}
</script>
