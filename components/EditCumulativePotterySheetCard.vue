<template>
<v-expansion-panels
    v-model="panels"
    accordion
    multiple
    flat
  >
    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text text-overline">Identification</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row
          v-if="isUpdate"
          dense
        >
          <v-col
            sm="4"
          >
            <v-text-field
              class="mx-4 secondary--text font-weight-bold" color="secondary"
              :value="isUpdate ? formatCode('cumulativePotterySheet', item) : undefined"
              label="code"
              disabled
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col sm="4">
            <v-text-field
              data-cy="site-code-input"
              class="mx-4"
              :value="getResponseValue('stratigraphicUnit.site.code', modelItem)"
              label="site code"
              disabled
            />
          </v-col>
          <v-col sm="4">
            <v-text-field
              data-cy="site-name-input"
              class="mx-4"
              :value="getResponseValue('stratigraphicUnit.site.name', modelItem)"
              label="site name"
              disabled
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col data-cy="area-select-col" sm="4">
            <v-text-field
              data-cy="area-code-input"
              class="mx-4"
              :value="getResponseValue('stratigraphicUnit.area.code', modelItem)"
              label="area code"
              disabled
            />
          </v-col>
          <v-col sm="4">
            <v-text-field
              data-cy="area-name-input"
              class="mx-4"
              :value="getResponseValue('stratigraphicUnit.area.name', modelItem)"
              label="area name"
              disabled
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col data-cy="su-select-col" sm="4">
            <v-text-field
              v-if="parent"
              data-cy="su-code-input"
              :value="formatCode('stratigraphicUnit', parent)"
              label="SU number"
              readonly
              class="mx-4"
            />
            <select-sus-autocomplete
              v-else
              :select.sync="modelItem.stratigraphicUnit"
              :error-messages="stratigraphicUnitErrors"
              class="mx-4"
              :disabled="updateCodeDisabled"
              v-on="$listeners"
              @input="$v.modelItem.stratigraphicUnit.$touch()"
              @blur="$v.modelItem.stratigraphicUnit.$touch()"
            />
          </v-col>
        </v-row>
        <v-row dense>

        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text text-overline">Sherd count by ware</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row dense>
          <v-col data-cy="cwd-input-col">
            <v-text-field
              v-model="modelItem.commonWareDiagnosticCount"
              label="common ware diagnostic"
              :error-messages="errors('commonWareDiagnosticCount')"
              class="mx-4"
              @input="$v.modelItem.commonWareDiagnosticCount.$touch()"
              @blur="$v.modelItem.commonWareDiagnosticCount.$touch()"
            />
          </v-col>
          <v-col data-cy="cwnd-input-col">
            <v-text-field
              v-model="modelItem.commonWareNonDiagnosticCount"
              label="common ware non diagnostic"
              :error-messages="errors('commonWareNonDiagnosticCount')"
              class="mx-4"
              @input="$v.modelItem.commonWareNonDiagnosticCount.$touch()"
              @blur="$v.modelItem.commonWareNonDiagnosticCount.$touch()"
            />
          </v-col>
          <v-col />
        </v-row>
        <v-row dense>
          <v-col data-cy="cwd-input-col">
            <v-text-field
              v-model="modelItem.fineWareDiagnosticCount"
              label="fine ware diagnostic"
              :error-messages="errors('fineWareDiagnosticCount')"
              class="mx-4"
              @input="$v.modelItem.fineWareDiagnosticCount.$touch()"
              @blur="$v.modelItem.fineWareDiagnosticCount.$touch()"
            />
          </v-col>
          <v-col data-cy="cwnd-input-col">
            <v-text-field
              v-model="modelItem.fineWareNonDiagnosticCount"
              label="fine ware non diagnostic"
              :error-messages="errors('fineWareNonDiagnosticCount')"
              class="mx-4"
              @input="$v.modelItem.fineWareNonDiagnosticCount.$touch()"
              @blur="$v.modelItem.fineWareNonDiagnosticCount.$touch()"
            />
          </v-col>
          <v-col />
        </v-row>
        <v-row dense>
          <v-col data-cy="cwd-input-col">
            <v-text-field
              v-model="modelItem.coarseWareDiagnosticCount"
              label="coarse ware diagnostic"
              :error-messages="errors('coarseWareDiagnosticCount')"
              class="mx-4"
              @input="$v.modelItem.coarseWareDiagnosticCount.$touch()"
              @blur="$v.modelItem.coarseWareDiagnosticCount.$touch()"
            />
          </v-col>
          <v-col data-cy="cwnd-input-col">
            <v-text-field
              v-model="modelItem.coarseWareNonDiagnosticCount"
              label="coarse ware non diagnostic"
              :error-messages="errors('coarseWareNonDiagnosticCount')"
              class="mx-4"
              @input="$v.modelItem.coarseWareNonDiagnosticCount.$touch()"
              @blur="$v.modelItem.coarseWareNonDiagnosticCount.$touch()"
            />
          </v-col>
          <v-col />
        </v-row>
        <v-row dense>
          <v-col data-cy="cwd-input-col">
            <v-text-field
              v-model="modelItem.kitchenWareDiagnosticCount"
              label="kitchen ware diagnostic"
              :error-messages="errors('kitchenWareDiagnosticCount')"
              class="mx-4"
              @input="$v.modelItem.kitchenWareDiagnosticCount.$touch()"
              @blur="$v.modelItem.kitchenWareDiagnosticCount.$touch()"
            />
          </v-col>
          <v-col data-cy="cwnd-input-col">
            <v-text-field
              v-model="modelItem.kitchenWareNonDiagnosticCount"
              label="kitchen ware non diagnostic"
              :error-messages="errors('kitchenWareNonDiagnosticCount')"
              class="mx-4"
              @input="$v.modelItem.kitchenWareNonDiagnosticCount.$touch()"
              @blur="$v.modelItem.kitchenWareNonDiagnosticCount.$touch()"
            />
          </v-col>
          <v-col />
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text text-overline">Sherd count by subperiod</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row dense>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodUndeterminedCount"
              label="undetermined"
              :error-messages="errors('subperiodUndeterminedCount')"
              class="mx-4"
              @input="$v.modelItem.subperiodUndeterminedCount.$touch()"
              @blur="$v.modelItem.subperiodUndeterminedCount.$touch()"
            />
          </v-col>
        </v-row>
        <v-divider class="my-4"/>
        <v-row dense>
          <v-col>
            <v-text-field
              v-model="modelItem.subperiodEPNCount"
              label="Early Pottery Neolithic"
              :error-messages="errors('subperiodEPNCount')"
              class="mx-4"
              @input="$v.modelItem.subperiodEPNCount.$touch()"
              @blur="$v.modelItem.subperiodEPNCount.$touch()"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="modelItem.subperiodHASCount"
              label="Hassuna"
              :error-messages="errors('subperiodHASCount')"
              class="mx-4"
              @input="$v.modelItem.subperiodHASCount.$touch()"
              @blur="$v.modelItem.subperiodHASCount.$touch()"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="modelItem.subperiodSAMCount"
              label="Samarra"
              :error-messages="errors('subperiodSAMCount')"
              class="mx-4"
              @input="$v.modelItem.subperiodSAMCount.$touch()"
              @blur="$v.modelItem.subperiodSAMCount.$touch()"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="modelItem.subperiodHALCount"
              label="Halaf"
              :error-messages="errors('subperiodHALCount')"
              class="mx-4"
              @input="$v.modelItem.subperiodHALCount.$touch()"
              @blur="$v.modelItem.subperiodHALCount.$touch()"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="modelItem.subperiodNUBCount"
              label="Norther Ubaid"
              :error-messages="errors('subperiodNUBCount')"
              class="mx-4"
              @input="$v.modelItem.subperiodNUBCount.$touch()"
              @blur="$v.modelItem.subperiodNUBCount.$touch()"
            />
          </v-col>
          <v-col />
        </v-row>
        <v-divider class="my-4"/>
        <v-row dense>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodLCACount"
              label="Late Chalcolithic (generic)"
              :error-messages="errors('subperiodLCACount')"
              class="mx-4"
              @input="$v.modelItem.subperiodLCACount.$touch()"
              @blur="$v.modelItem.subperiodLCACount.$touch()"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              v-model="modelItem.subperiodLCA1Count"
              label="Late Chalcolithic 1"
              :error-messages="errors('subperiodLCA1Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodLCA1Count.$touch()"
              @blur="$v.modelItem.subperiodLCA1Count.$touch()"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="modelItem.subperiodLCA2Count"
              label="Late Chalcolithic 2"
              :error-messages="errors('subperiodLCA2Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodLCA2Count.$touch()"
              @blur="$v.modelItem.subperiodLCA2Count.$touch()"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="modelItem.subperiodLCA3Count"
              label="Late Chalcolithic 3"
              :error-messages="errors('subperiodLCA3Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodLCA3Count.$touch()"
              @blur="$v.modelItem.subperiodLCA3Count.$touch()"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="modelItem.subperiodLCA4Count"
              label="Late Chalcolithic 4"
              :error-messages="errors('subperiodLCA4Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodLCA4Count.$touch()"
              @blur="$v.modelItem.subperiodLCA4Count.$touch()"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="modelItem.subperiodLCA5Count"
              label="Late Chalcolithic 5"
              :error-messages="errors('subperiodLCA5Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodLCA5Count.$touch()"
              @blur="$v.modelItem.subperiodLCA5Count.$touch()"
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodSURCount"
              label="Southern Uruk"
              :error-messages="errors('subperiodSURCount')"
              class="mx-4"
              @input="$v.modelItem.subperiodSURCount.$touch()"
              @blur="$v.modelItem.subperiodSURCount.$touch()"
            />
          </v-col>
        </v-row>
        <v-divider class="my-4"/>
        <v-row dense>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodEMTCount"
              label="Early Middle Tigris (generic)"
              :error-messages="errors('subperiodEMTCount')"
              class="mx-4"
              @input="$v.modelItem.subperiodEMTCount.$touch()"
              @blur="$v.modelItem.subperiodEMTCount.$touch()"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              v-model="modelItem.subperiodEMT0Count"
              label="Early Middle Tigris 0"
              :error-messages="errors('subperiodEMT0Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodEMT0Count.$touch()"
              @blur="$v.modelItem.subperiodEMT0Count.$touch()"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="modelItem.subperiodEMT1Count"
              label="Early Middle Tigris 1"
              :error-messages="errors('subperiodEMT1Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodEMT1Count.$touch()"
              @blur="$v.modelItem.subperiodEMT1Count.$touch()"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="modelItem.subperiodEMT2Count"
              label="Early Middle Tigris 2"
              :error-messages="errors('subperiodEMT2Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodEMT2Count.$touch()"
              @blur="$v.modelItem.subperiodEMT2Count.$touch()"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="modelItem.subperiodEMT3Count"
              label="Early Middle Tigris 3"
              :error-messages="errors('subperiodEMT3Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodEMT3Count.$touch()"
              @blur="$v.modelItem.subperiodEMT3Count.$touch()"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="modelItem.subperiodEMT4Count"
              label="Early Middle Tigris 4"
              :error-messages="errors('subperiodEMT4Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodEMT4Count.$touch()"
              @blur="$v.modelItem.subperiodEMT4Count.$touch()"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="modelItem.subperiodEMT5Count"
              label="Early Middle Tigris 5"
              :error-messages="errors('subperiodEMT5Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodEMT5Count.$touch()"
              @blur="$v.modelItem.subperiodEMT5Count.$touch()"
            />
          </v-col>
        </v-row>
        <v-divider class="my-4"/>
        <v-row dense>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodMBACount"
              label="Middle Bronze Age (generic)"
              :error-messages="errors('subperiodMBACount')"
              class="mx-4"
              @input="$v.modelItem.subperiodMBACount.$touch()"
              @blur="$v.modelItem.subperiodMBACount.$touch()"
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodMBA1Count"
              label="Middle Bronze Age 1"
              :error-messages="errors('subperiodMBA1Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodMBA1Count.$touch()"
              @blur="$v.modelItem.subperiodMBA1Count.$touch()"
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodMBA2Count"
              label="Middle Bronze Age 2"
              :error-messages="errors('subperiodMBA2Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodMBA2Count.$touch()"
              @blur="$v.modelItem.subperiodMBA2Count.$touch()"
            />
          </v-col>
        </v-row>
        <v-divider class="my-4"/>
        <v-row dense>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodLBA1Count"
              label="Late Bronze Age 1 / Mitanni"
              :error-messages="errors('subperiodLBA1Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodLBA1Count.$touch()"
              @blur="$v.modelItem.subperiodLBA1Count.$touch()"
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodLBA2Count"
              label="Late Bronze Age 2 / Middle Assyrian"
              :error-messages="errors('subperiodLBA2Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodLBA2Count.$touch()"
              @blur="$v.modelItem.subperiodLBA2Count.$touch()"
            />
          </v-col>
        </v-row>
        <v-divider class="my-4"/>
        <v-row dense>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodIRA1Count"
              label="Iron Age 1-2 / Neo Assyrian"
              :error-messages="errors('subperiodIRA1Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodIRA1Count.$touch()"
              @blur="$v.modelItem.subperiodIRA1Count.$touch()"
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodIRA2Count"
              label="Iron Age 3 / Achaemenid"
              :error-messages="errors('subperiodIRA2Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodIRA2Count.$touch()"
              @blur="$v.modelItem.subperiodIRA2Count.$touch()"
            />
          </v-col>
        </v-row>
        <v-divider class="my-4"/>
        <v-row dense>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodHELCount"
              label="Hellenistic"
              :error-messages="errors('subperiodHELCount')"
              class="mx-4"
              @input="$v.modelItem.subperiodHELCount.$touch()"
              @blur="$v.modelItem.subperiodHELCount.$touch()"
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodPARCount"
              label="Parthian"
              :error-messages="errors('subperiodPARCount')"
              class="mx-4"
              @input="$v.modelItem.subperiodPARCount.$touch()"
              @blur="$v.modelItem.subperiodPARCount.$touch()"
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodBYZCount"
              label="Byzantine"
              :error-messages="errors('subperiodBYZCount')"
              class="mx-4"
              @input="$v.modelItem.subperiodBYZCount.$touch()"
              @blur="$v.modelItem.subperiodBYZCount.$touch()"
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodSASCount"
              label="Sasanian"
              :error-messages="errors('subperiodSASCount')"
              class="mx-4"
              @input="$v.modelItem.subperiodSASCount.$touch()"
              @blur="$v.modelItem.subperiodSASCount.$touch()"
            />
          </v-col>
        </v-row>
        <v-divider class="my-4"/>
        <v-row dense>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodISLCount"
              label="Islamic (generic)"
              :error-messages="errors('subperiodISLCount')"
              class="mx-4"
              @input="$v.modelItem.subperiodISLCount.$touch()"
              @blur="$v.modelItem.subperiodISLCount.$touch()"
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodISL1Count"
              label="Early Islamic"
              :error-messages="errors('subperiodISL1Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodISL1Count.$touch()"
              @blur="$v.modelItem.subperiodISL1Count.$touch()"
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodISL2Count"
              label="Middle Islamic"
              :error-messages="errors('subperiodISL2Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodISL2Count.$touch()"
              @blur="$v.modelItem.subperiodISL2Count.$touch()"
            />
          </v-col>
          <v-col sm="2">
            <v-text-field
              v-model="modelItem.subperiodISL3Count"
              label="Late Islamic"
              :error-messages="errors('subperiodISL3Count')"
              class="mx-4"
              @input="$v.modelItem.subperiodISL3Count.$touch()"
              @blur="$v.modelItem.subperiodISL3Count.$touch()"
            />
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text text-overline">Misc</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row dense>
          <v-col data-cy="notes-input">
            <v-textarea
              v-model="modelItem.notes"
              label="notes"
              class="mx-4"
              data-cy="pottery-description-input"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col sm="2" data-cy="compiler-select-col">
            <select-nominatives-autocomplete
              label="compiler"
              :select.sync="modelItem.compiler"
              :error-messages="compilerErrors"
              :disabled="updateCodeDisabled"
              class="mx-4"
              v-on="$listeners"
              @input="$v.modelItem.compiler.$touch()"
              @blur="$v.modelItem.compiler.$touch()"
            />
          </v-col>
          <v-col sm="2">
            <v-menu
              ref="menu"
              v-model="dateMenu"
              :close-on-content-click="false"
              :return-value.sync="modelItem.date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="modelItem.date"
                  label="compilation date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="modelItem.date"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="dateMenu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(modelItem.date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import {clone, has} from "ramda";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
import ResourceValidationCumulativePotterySheetMixin from "@/mixins/validation/ResourceValidationCumulativePotterySheetMixin";
import ResourceItemEditMixin from "@/mixins/ResourceItemEditMixin";
import ResourceCollectionParentMixin from "@/mixins/ResourceCollectionParentMixin";
import {normalizeRequestBodyData} from "@/src/request";
import {CUMULATIVE_POTTERY_SHEET_NUMERIC_FIELDS} from "@/src/constants";

export default {
  name: "EditCumulativePotterySheetCard",
  mixins: [
    ResourceItemDataAccessorMixin,
    ResourceNavigationMixin,
    ResourceValidationCumulativePotterySheetMixin,
    ResourceCollectionParentMixin,
    ResourceItemEditMixin
  ],
  data() {
    return {
      dateMenu: false,
      modelItem: {
        stratigraphicUnit: {},
        date: new Date().toISOString().substring(0, 10),
      },
      tab: 'ware',
      panels: [
        0,1,2,3,4,5
      ],
    }
  },
  computed: {
    requestData() {
      const data = normalizeRequestBodyData(this.updateItem)
      for (const key of [
        'stratigraphicUnit',
        'preservationState',
        'type',
      ]) {
        if (has(key, data)) {
          data[key] = this.normalizeResource(key)
        }
      }
      for (const key of [...['number'],...CUMULATIVE_POTTERY_SHEET_NUMERIC_FIELDS]) {
        if (has(key, data)) {
          data[key] = 1 * data[key]
        }
      }
      return data
    }
  },
  watch: {
    parent: {
      handler(parent) {
        if (parent) {
          this.modelItem.stratigraphicUnit = clone(parent)
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
