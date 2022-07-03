<template>
    <v-expansion-panels
      :value="[0,1,2,3]"
      accordion
      readonly
      multiple
      flat
    >
      <v-expansion-panel>
        <v-expansion-panel-header class="grey--text text-overline">Location</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row dense>
            <v-col sm="1">
              <v-text-field
                data-cy="site-code-input"
                :value="getResponseValue('area.code.name', modelItem) || getResponseValue('site.code', modelItem)"
                label="site code"
                class="mx-4"
                disabled
              />
            </v-col>
            <v-col sm="5">
              <v-text-field
                data-cy="site-name-input"
                :value="getResponseValue('area.site.name', modelItem) || getResponseValue('site.name', modelItem)"
                label="site name"
                class="mx-4"
                disabled
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col data-cy="area-select-col" sm="1">
              <v-text-field
                v-if="parent"
                data-cy="area-code-input"
                :value="getResponseValue('area.site.code', modelItem)"
                label="area code"
                class="mx-4"
                disabled
              />
              <select-areas-autocomplete
                v-else
                :select.sync="modelItem.area"
                :error-messages="areaErrors"
                :disabled="updateCodeDisabled"
                class="mx-4"
                v-on="$listeners"
                @input="$v.modelItem.area.$touch()"
                @blur="$v.modelItem.area.$touch()"
              />
            </v-col>
            <v-col sm="5">
              <v-text-field
                data-cy="area-name-input"
                :value="getResponseValue('area.name', modelItem)"
                label="area name"
                class="mx-4"
                disabled
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col data-cy="building-input-col" sm="3">
              <v-text-field
                v-model="modelItem.building"
                label="building"
                class="mx-4"
                :error-messages="buildingErrors"
                @input="$v.modelItem.building.$touch()"
                @blur="$v.modelItem.building.$touch()"
              />
            </v-col>
            <v-col data-cy="building-phase-input-col" sm="3">
              <v-text-field
                v-model="modelItem.buildingPhase"
                label="building phase"
                class="mx-4"
                :error-messages="buildingPhaseErrors"
                @input="$v.modelItem.buildingPhase.$touch()"
                @blur="$v.modelItem.buildingPhase.$touch()"
              />
            </v-col>
          </v-row>
          <v-row dense >
            <v-col data-cy="room-input-col" sm="3">
              <v-text-field
                v-model="modelItem.room"
                label="room"
                class="mx-4"
                :error-messages="roomErrors"
                @input="$v.modelItem.room.$touch()"
                @blur="$v.modelItem.room.$touch()"
              />
            </v-col>
          </v-row>
          <v-row dense v-if="isUpdate">
            <v-col sm="3">
            <select-graves-autocomplete
              data-cy="grave-input"
              class="mx-4"
              clearable
              :select.sync="modelItem.grave"
              :area="modelItem.area"
              v-on="$listeners"
            />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="grey--text text-overline">Identification</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row dense>
            <v-col sm="3">
              <v-text-field
                class="mx-4 secondary--text font-weight-bold" color="secondary"
                :value="isUpdate ? formatCode('stratigraphicUnit', item) : undefined"
                label="code"
                disabled
              />
            </v-col>
            <v-col data-cy="year-select-col" sm="3">
              <v-autocomplete
                v-model="modelItem.year"
                label="excavation year"
                required
                :disabled="updateCodeDisabled"
                class="mx-4"
                :items="years"
                :error-messages="yearErrors"
                @input="$v.modelItem.year.$touch()"
                @blur="$v.modelItem.year.$touch()"
              />
            </v-col>
            <v-col />
            <v-col data-cy="number-input-col">
              <v-text-field
                v-model="modelItem.number"
                label="number"
                :disabled="updateCodeDisabled"
                required
                class="mx-4"
                :error-messages="numberErrors"
                @input="$v.modelItem.number.$touch()"
                @blur="$v.modelItem.number.$touch()"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col data-cy="type-select-col" sm="3">
              <select-vocabulary-autocomplete
                label="type"
                :select.sync="modelItem.type"
                :error-messages="typeErrors"
                vocabulary-name="suType"
                class="mx-4"
                v-on="$listeners"
                @input="$v.modelItem.type.$touch()"
                @blur="$v.modelItem.type.$touch()"
              />
            </v-col>
            <v-col data-cy="preservation-select-col" sm="3">
              <select-vocabulary-autocomplete
                label="preservation"
                class="mx-4"
                :select.sync="modelItem.preservationState"
                vocabulary-name="preservationState"
                v-on="$listeners"
              />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="grey--text text-overline">Periodization</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row dense>
            <v-col sm="1">
              <v-text-field
                :value="getResponseValue('period.code', item)"
                class="mx-4"
                label="period code"
                disabled
              />
            </v-col>
            <v-col data-cy="period-select-col" sm="2">
              <select-period-vocabulary-autocomplete
                class="mx-4"
                :select.sync="modelItem.period"
              />
            </v-col>
            <v-spacer />
            <v-col data-cy="phase-input-col" sm="2">
              <v-text-field
                v-model="modelItem.phase"
                class="mx-4"
                label="phase"
                :error-messages="phaseErrors"
                @input="$v.modelItem.phase.$touch()"
                @blur="$v.modelItem.phase.$touch()"
              />
            </v-col>
            <v-col data-cy="subphase-input-col" sm="1">
              <v-text-field
                v-model="modelItem.subPhase"
                class="mx-4"
                label="sub phase"
                :error-messages="subPhaseErrors"
                @input="$v.modelItem.subPhase.$touch()"
                @blur="$v.modelItem.subPhase.$touch()"
              />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="grey--text text-overline">Misc</v-expansion-panel-header>
        <v-expansion-panel-content>
      <v-row dense>
        <v-col>
          <v-textarea
            v-model="modelItem.description"
            class="mx-4"
            label="description"
            data-cy="su-description-input"
          />
        </v-col>
        <v-col>
          <v-textarea
            v-model="modelItem.interpretation"
            class="mx-4"
            label="interpretation"
            data-cy="su-interpretation-input"
          />
        </v-col>
        <v-col>
          <v-textarea
            v-model="modelItem.summary"
            label="summary"
            class="mx-4"
            data-cy="su-summary-input"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col data-cy="top-elevation-col" sm="4">
          <v-text-field
            v-model="modelItem.topElevation"
            class="mx-4"
            label="top elevation (m)"
            :error-messages="topElevationErrors"
            @input="$v.modelItem.topElevation.$touch()"
            @blur="$v.modelItem.topElevation.$touch()"
          />
        </v-col>
        <v-col data-cy="bottom-elevation-col" sm="4">
          <v-text-field
            v-model="modelItem.bottomElevation"
            class="mx-4"
            label="bottom elevation (m)"
            :error-messages="bottomElevationErrors"
            @input="$v.modelItem.bottomElevation.$touch()"
            @blur="$v.modelItem.bottomElevation.$touch()"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-text-field
            v-model="modelItem.compiler"
            label="compiler"
            class="mx-4"
            data-cy="compiler-input"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="modelItem.areaSupervisor"
            label="supervisor"
            class="mx-4"
            data-cy="area-supervisor-input"
          />
        </v-col>
        <v-col>
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
                class="mx-4"
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
import {clone, has, hasPath} from "ramda";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
import ResourceValidationSuMixin from "@/mixins/validation/ResourceValidationSuMixin";
import ResourceItemEditMixin from "@/mixins/ResourceItemEditMixin";
import ResourceCollectionParentMixin from "@/mixins/ResourceCollectionParentMixin";
import SelectVocabularyAutocomplete from "@/components/SelectVocabularyAutocomplete";
import SelectAreasAutocomplete from "@/components/SelectAreasAutocomplete";
import {normalizeRequestBodyData} from "@/src/request";
import {yearsRange} from "@/src/utils";


export default {
  name: "EditSuCard",
  components: {
    SelectVocabularyAutocomplete,
    SelectAreasAutocomplete
  },
  mixins: [
    ResourceItemDataAccessorMixin,
    ResourceNavigationMixin,
    ResourceValidationSuMixin,
    ResourceCollectionParentMixin,
    ResourceItemEditMixin
  ],
  data() {
    return {
      dateMenu: false,
      modelItem: {
        area: {},
        date: new Date().toISOString().substring(0, 10),
      },
    }
  },
  computed: {
    years: () => yearsRange(),
    requestData() {
      const data = normalizeRequestBodyData(this.updateItem)
      for (const key of [
        'area',
        'type',
        'period',
        'preservationState',
        'grave',
      ]) {
        if (has(key, data)) {
          data[key] = this.normalizeResource(key)
        }
      }
      for (const key of [
        'number',
        'topElevation',
        'bottomElevation',
        'building',
        'buildingPhase',
        'phase',
        'subPhase',
      ]) {
        if (has(key, data)) {
          data[key] = 1 * data[key]
        }
      }
      if (hasPath(['area','site'], data)) {
        data.site = data.area.site['@id']
      }
      return data
    }
  },
  watch: {
    parent: {
      handler(parent) {
        if (parent) {
          this.modelItem.area = clone(parent)
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
