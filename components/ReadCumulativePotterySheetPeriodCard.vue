<template>
  <v-expansion-panels
    v-model="panels"
    accordion
    multiple
  >
    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text text-overline">Sherd count by period</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row dense>
          <v-col sm="3">
            <v-text-field
              :value="getResponseValue('diagnosticWareCount', item)"
              label="diagnostic sherd count"
              readonly
            />
          </v-col>
          <v-col sm="3">
            <v-text-field
              :value="getResponseValue('subperiodUndeterminedCount', item)"
              label="undetermined period sherd count"
              readonly
            />
          </v-col>
          <v-col />
          <v-col />
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              :value="getResponseValue('periodEPNCount', item)"
              label="Early Pottery Neolithic"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('periodHASCount', item)"
              label="Hassuna"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('periodSAMCount', item)"
              label="Samarra"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('periodHALCount', item)"
              label="Halaf"
              readonly
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              :value="getResponseValue('periodNUBCount', item)"
              label="Northern Ubaid"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('periodLCACount', item)"
              label="Late Chalcolithic"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('periodEBACount', item)"
              label="Early Middle Tigris"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('periodMBACount', item)"
              label="Middle Bronze Age"
              readonly
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              :value="getResponseValue('periodLBACount', item)"
              label="Late Bronze Age"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('periodIRACount', item)"
              label="Iron Age"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('periodHELCount', item)"
              label="Hellenistic"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('periodPARCount', item)"
              label="Parthian"
              readonly
            />
          </v-col>
        </v-row>
        <v-row dense>
              <v-col>
                <v-text-field
                  :value="getResponseValue('periodBYZCount', item)"
                  label="Byzantine"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('periodSASCount', item)"
                  label="Sasanian"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('periodISLCount', item)"
                  label="Islamic"
                  readonly
                />
              </v-col>
              <v-col />
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text text-overline">sherd count by subperiod</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row dense>
          <v-col>
            <v-text-field
              :value="getResponseValue('subperiodEPNCount', item)"
              label="Early Pottery Neolithic"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('subperiodHASCount', item)"
              label="Hassuna"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('subperiodSAMCount', item)"
              label="Samarra"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('subperiodHALCount', item)"
              label="Halaf"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('subperiodNUBCount', item)"
              label="Northern Ubaid"
              readonly
            />
          </v-col>
          <v-col />
        </v-row>
        <v-divider class="my-4"/>
        <v-row dense>
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('subperiodLCACount', item)"
              label="Late Chalcolithic (generic)"
              readonly
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              :value="getResponseValue('subperiodLCA1Count', item)"
              label="Late Chalcolithic 1"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('subperiodLCA2Count', item)"
              label="Late Chalcolithic 2"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('subperiodLCA3Count', item)"
              label="Late Chalcolithic 3"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('subperiodLCA4Count', item)"
              label="Late Chalcolithic 4"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('subperiodLCA5Count', item)"
              label="Late Chalcolithic 5"
              readonly
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('subperiodSURCount', item)"
              label="Southern Uruk"
              readonly
            />
          </v-col>
        </v-row>
        <v-divider class="my-4"/>
        <v-row dense>
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('subperiodEMTCount', item)"
              label="Early Middle Tigris (generic)"
              readonly
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              :value="getResponseValue('subperiodEMT0Count', item)"
              label="Early Middle Tigris 0"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('subperiodEMT1Count', item)"
              label="Early Middle Tigris 1"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('subperiodEMT2Count', item)"
              label="Early Middle Tigris 2"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('subperiodEMT3Count', item)"
              label="Early Middle Tigris 3"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('subperiodEMT4Count', item)"
              label="Early Middle Tigris 4"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('subperiodEMT5Count', item)"
              label="Early Middle Tigris 5"
              readonly
            />
          </v-col>
        </v-row>
        <v-divider class="my-4"/>
        <v-row dense>
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('subperiodMBACount', item)"
              label="Middle Bronze Age (generic)"
              readonly
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('subperiodMBA1Count', item)"
              label="Middle Bronze Age 1"
              readonly
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('subperiodMBA2Count', item)"
              label="Middle Bronze Age 2"
              readonly
            />
          </v-col>
        </v-row>
        <v-divider class="my-4"/>
        <v-row dense>
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('subperiodLBA1Count', item)"
              label="Late Bronze Age 1 / Mitanni"
              readonly
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('subperiodLBA2Count', item)"
              label="Late Bronze Age 2 / Middle Assyrian"
              readonly
            />
          </v-col>
        </v-row>
        <v-divider class="my-4"/>
        <v-row dense>
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('subperiodIRA1Count', item)"
              label="Iron Age 1-2 / Neo Assyrian"
              readonly
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('subperiodIRA2Count', item)"
              label="Iron Age 3 / Achaemenid"
              readonly
            />
          </v-col>
        </v-row>
        <v-divider class="my-4"/>
        <v-row dense>
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('subperiodHELCount', item)"
              label="Hellenistic"
              readonly
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('subperiodPARCount', item)"
              label="Parthian"
              readonly
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('subperiodBYZCount', item)"
              label="Byzantine"
              readonly
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('subperiodSASCount', item)"
              label="Sasanian"
              readonly
            />
          </v-col>
        </v-row>
        <v-divider class="my-4"/>
        <v-row dense>
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('subperiodISLCount', item)"
              label="Islamic (generic)"
              readonly
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('subperiodISL1Count', item)"
              label="Early Islamic"
              readonly
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('subperiodISL2Count', item)"
              label="Middle Islamic"
              readonly
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('subperiodISL3Count', item)"
              label="Late Islamic"
              readonly
            />
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";

export default {
  name: "ReadCumulativePotterySheetPeriodCard",
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
        0
      ],
    }
  }
}
</script>
