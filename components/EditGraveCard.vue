<template>
      <v-expansion-panels
        :value="[0,1,2,3,4]"
        accordion
        multiple
        readonly
        flat
      >
        <v-expansion-panel>
          <v-expansion-panel-header class="grey--text text-overline">Location</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row dense>
              <v-col sm="3">
                <v-text-field
                  class="mx-4"
                  data-cy="site-code-input"
                  :value="getResponseValue('area.code.name', modelItem) || getResponseValue('site.code', modelItem)"
                  label="site code"
                  disabled
                />
              </v-col>
              <v-col sm="3">
                <v-text-field
                  class="mx-4"
                  data-cy="site-name-input"
                  :value="getResponseValue('area.site.name', modelItem) || getResponseValue('site.name', modelItem)"
                  label="site name"
                  disabled
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col data-cy="area-select-col" sm="3">
                <v-text-field
                  v-if="parent"
                  class="mx-4"
                  data-cy="area-code-input"
                  :value="getResponseValue('area.site.code', modelItem)"
                  label="area code"
                  disabled
                />
                <select-areas-autocomplete
                  v-else
                  class="mx-4"
                  :select.sync="modelItem.area"
                  :error-messages="areaErrors"
                  :disabled="updateCodeDisabled"
                  v-on="$listeners"
                  @input="$v.modelItem.area.$touch()"
                  @blur="$v.modelItem.area.$touch()"
                />
              </v-col>
              <v-col sm="3">
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
                  class="mx-4"
                  label="building"
                  :error-messages="buildingErrors"
                  @input="$v.modelItem.building.$touch()"
                  @blur="$v.modelItem.building.$touch()"
                />
              </v-col>
              <v-col data-cy="building-subphase-input-col" sm="3">
                <v-text-field
                  v-model="modelItem.buildingSubPhase"
                  class="mx-4"
                  label="building sub phase"
                  :error-messages="buildingSubPhaseErrors"
                  @input="$v.modelItem.buildingSubPhase.$touch()"
                  @blur="$v.modelItem.buildingSubPhase.$touch()"
                />
              </v-col>
              <v-col sm="3" />
            </v-row>
            <v-row dense>
              <v-col data-cy="room-input-col" sm="3">
                <v-text-field
                  v-model="modelItem.room"
                  class="mx-4"
                  label="room"
                  :error-messages="roomErrors"
                  @input="$v.modelItem.room.$touch()"
                  @blur="$v.modelItem.room.$touch()"
                />
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="grey--text text-overline">Identification</v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-row dense>
            <v-col sm="4">
              <v-text-field
                class="mx-4 secondary--text font-weight-bold" color="secondary"
                :value="isUpdate ? formatCode('grave', item) : undefined"
                label="code"
                disabled
              />
            </v-col>
            <v-col
              data-cy="year-select-col"
              sm="4"
            >
              <v-autocomplete
                v-model="modelItem.year"
                class="mx-4"
                label="excavation year"
                required
                :disabled="updateCodeDisabled"
                :items="years"
                :error-messages="yearErrors"
                @input="$v.modelItem.year.$touch()"
                @blur="$v.modelItem.year.$touch()"
              />
            </v-col>
            <v-col
              data-cy="number-input-col"
              sm="4"
            >
              <v-text-field
                v-model="modelItem.number"
                class="mx-4"
                label="number"
                :disabled="updateCodeDisabled"
                required
                :error-messages="numberErrors"
                @input="$v.modelItem.number.$touch()"
                @blur="$v.modelItem.number.$touch()"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col
              data-cy="type-select-col"
              sm="4"
            >
              <select-vocabulary-autocomplete
                class="mx-4"
                label="type"
                :select.sync="modelItem.type"
                :error-messages="typeErrors"
                vocabulary-name="graveType"
                v-on="$listeners"
                @input="$v.modelItem.type.$touch()"
                @blur="$v.modelItem.type.$touch()"
              />
            </v-col>
            <v-col
              data-cy="ritual-select-col"
              sm="4"
            >
              <select-vocabulary-autocomplete
                class="mx-4"
                label="ritual"
                :select.sync="modelItem.ritual"
                vocabulary-name="ritual"
                v-on="$listeners"
              />
            </v-col>
            <v-col
              data-cy="deposition-select-col"
              sm="4"
            >
              <select-vocabulary-autocomplete
                class="mx-4"
                label="deposition"
                :select.sync="modelItem.deposition"
                vocabulary-name="deposition"
                v-on="$listeners"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-text-field
                v-model="modelItem.alignment"
                class="mx-4"
                data-cy="alignment-input"
                label="alignment"
              />
            </v-col>
            <v-col />
            <v-col data-cy="preservation-state-select-col">
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
              <v-col data-cy="period-select-col" sm="4">
                <select-period-vocabulary-autocomplete
                  class="mx-4"
                  :select.sync="modelItem.period"
                />
              </v-col>
              <v-col data-cy="phase-input-col" sm="4">
                <v-text-field
                  v-model="modelItem.phase"
                  class="mx-4"
                  label="phase"
                  :error-messages="phaseErrors"
                  @input="$v.modelItem.phase.$touch()"
                  @blur="$v.modelItem.phase.$touch()"
                />
              </v-col>
              <v-col data-cy="subphase-input-col" sm="4">
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
          <v-expansion-panel-header class="grey--text text-overline">Stratigraphy</v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-row dense>
            <v-col>
              <select-sus-autocomplete
                class="mx-4"
                label="earlier than"
                :select.sync="modelItem.earlierThan"
                :clearable="true"
              />
            </v-col>
            <v-col />
            <v-col>
              <select-sus-autocomplete
                class="mx-4"
                label="later than"
                :select.sync="modelItem.laterThan"
                :clearable="true"
              />
            </v-col>
          </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="grey--text text-overline">Misc</v-expansion-panel-header>
          <v-expansion-panel-content>
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
              <v-textarea
                v-model="modelItem.description"
                class="mx-4"
                label="description"
                data-cy="description-input"
              />
            </v-col>
            <v-col>
              <v-textarea
                v-model="modelItem.interpretation"
                class="mx-4"
                label="interpretation"
                data-cy="interpretation-input"
              />
            </v-col>
            <v-col>
              <v-textarea
                v-model="modelItem.summary"
                label="summary"
                class="mx-4"
                data-cy="summary-input"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col data-cy="compiler-select-col">
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
            <v-col>
              <select-nominatives-autocomplete
                label="supervisor"
                :select.sync="modelItem.areaSupervisor"
                class="mx-4"
                data-cy="area-supervisor-input"
              />
            </v-col>
            <v-col>
              <select-date-menu :date.sync="modelItem.date" />
            </v-col>
          </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
</template>

<script>
import {clone, has, hasPath} from "ramda";
import {mapActions} from "vuex";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
import ResourceValidationGraveMixin from "@/mixins/validation/ResourceValidationGraveMixin";
import ResourceCollectionParentMixin from "@/mixins/ResourceCollectionParentMixin";
import ResourceItemEditMixin from "@/mixins/ResourceItemEditMixin";
import {normalizeRequestBodyData} from "@/src/request";
import {yearsRange} from "@/src/utils";


export default {
  name: "EditGraveCard",
  mixins: [
    ResourceItemDataAccessorMixin,
    ResourceNavigationMixin,
    ResourceValidationGraveMixin,
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
      numericProps: [
        'number',
        'building',
        'buildingSubPhase',
        'phase',
        'subPhase',
        'topElevation',
        'bottomElevation',
      ]
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
        'ritual',
        'preservationState',
        'earlierThan',
        'laterThan',
        'deposition',
      ]) {
        if (has(key, data)) {
          data[key] = this.normalizeResource(key)
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
  },
  methods: {
    ...mapActions('http', ['isUniqueNumberInSite']),
  },
}
</script>
