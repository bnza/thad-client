<template>
      <v-expansion-panels
        :value="[0,1,2,3]"
        accordion
        multiple
        readonly
      >
        <v-expansion-panel>
          <v-expansion-panel-header class="grey--text text-overline">Identification</v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-row dense>
            <v-col sm="4">
              <v-text-field
                v-if="isUpdate"
                class="secondary--text font-weight-bold" color="secondary"
                :value="formatCode('grave', item)"
                label="code"
                readonly
              />
            </v-col>
            <v-col
              data-cy="area-select-col"
              sm="2"
            >
              <v-text-field
                v-if="parent"
                data-cy="area-code-input"
                :value="formatCode('area', modelItem.area)"
                label="area code"
                readonly
              />
              <select-areas-autocomplete
                v-else
                :select.sync="modelItem.area"
                :error-messages="areaErrors"
                v-on="$listeners"
                @input="$v.modelItem.area.$touch()"
                @blur="$v.modelItem.area.$touch()"
              />
            </v-col>
            <v-col
              data-cy="year-select-col"
              sm="2"
            >
              <v-autocomplete
                v-model="modelItem.year"
                label="excavation year"
                required
                :items="years"
                :error-messages="yearErrors"
                @input="$v.modelItem.year.$touch()"
                @blur="$v.modelItem.year.$touch()"
              />
            </v-col>
<!--              <v-text-field-->
<!--                data-cy="site-name-input"-->
<!--                :value="getResponseValue('area.site.name', modelItem) || getResponseValue('site.name', modelItem)"-->
<!--                label="site name"-->
<!--                readonly-->
<!--              />-->
            <v-col data-cy="number-input-col">
              <v-text-field
                v-model="modelItem.number"
                label="number"
                required
                :error-messages="numberErrors"
                @input="$v.modelItem.number.$touch()"
                @blur="$v.modelItem.number.$touch()"
              />
            </v-col>
<!--            <v-col>
              <v-text-field
                data-cy="area-name-input"
                :value="getResponseValue('area.name', modelItem)"
                label="area name"
                readonly
              />
            </v-col>-->
          </v-row>
          <v-row dense>
            <v-col
              data-cy="type-select-col"
              sm="4"
            >
              <select-vocabulary-autocomplete
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
              <v-select
                v-model="isSecondaryDeposition"
                label="deposition"
                vocabulary-name="ritual"
                :items="[
                  {value: 0, text: 'primary'}, {value: 1, text: 'secondary'}
                  ]"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-text-field
                v-model="modelItem.alignment"
                data-cy="alignment-input"
                label="alignment"
              />
            </v-col>
            <v-col />
            <v-col>
              <select-vocabulary-autocomplete
                label="preservation"
                :select.sync="modelItem.preservationState"
                vocabulary-name="preservationState"
                v-on="$listeners"
              />
            </v-col>
<!--            <v-col data-cy="period-select-col">-->
<!--              <select-period-vocabulary-autocomplete-->
<!--                :sub-periods="false"-->
<!--                :select.sync="modelItem.period"-->
<!--              />-->
<!--            </v-col>-->
          </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="grey--text text-overline">Identification</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row dense>
              <v-col data-cy="period-select-col">
                <select-period-vocabulary-autocomplete
                  :sub-periods="false"
                  :select.sync="modelItem.period"
                />
              </v-col>
              <v-col />
              <v-col>
                <v-text-field
                  v-model="modelItem.phase"
                  data-cy="phase-input"
                  label="phase"
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
                  label="cut SU"
                  :select.sync="modelItem.cutStratigraphicUnit"
                  :clearable="true"
                />
              </v-col>
              <v-col>
                <select-sus-autocomplete
                  label="fill SU"
                  :select.sync="modelItem.fillStratigraphicUnit"
                  :clearable="true"
                />
              </v-col>
              <v-col>
                <select-sus-autocomplete
                  label="skeleton SU"
                  :select.sync="modelItem.skeletonStratigraphicUnit"
                  :clearable="true"
                />
              </v-col>
            </v-row>
          <v-row dense>
            <v-col>
              <select-sus-autocomplete
                label="earlier than"
                :select.sync="modelItem.earlierThan"
                :clearable="true"
              />
            </v-col>
            <v-col />
            <v-col>
              <select-sus-autocomplete
                label="later than"
                :select.sync="modelItem.laterThan"
                :clearable="true"
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
              <v-textarea
                v-model="modelItem.description"
                label="description"
                data-cy="su-description-input"
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
            <v-col>
              <v-textarea
                v-model="modelItem.interpretation"
                label="interpretation"
                data-cy="su-interpretation-input"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-text-field
                v-model="modelItem.compiler"
                label="compiler"
                data-cy="compiler-input"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="modelItem.areaSupervisor"
                label="supervisor"
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
    }
  },
  computed: {
    years: () => yearsRange(),
    isSecondaryDeposition: {
      get() {
        const isSecondaryDeposition = this.modelItem.isSecondaryDeposition
        return isSecondaryDeposition === undefined ? undefined : isSecondaryDeposition === true ? 1 : 0
      },
      set(flag) {
        this.modelItem.isSecondaryDeposition = !!flag
      }
    },
    requestData() {
      const data = normalizeRequestBodyData(this.updateItem)
      for (const key of [
        'area',
        'type',
        'period',
        'ritual',
        'preservationState',
        'cutStratigraphicUnit',
        'fillStratigraphicUnit',
        'skeletonStratigraphicUnit',
        'earlierThan',
        'laterThan',
      ]) {
        if (has(key, data)) {
          data[key] = this.normalizeResource(key)
        }
      }
      for (const key of [
        'number',
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
