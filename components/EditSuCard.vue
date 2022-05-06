<template>
    <v-card-text>
        <v-container>
          <v-row dense>
            <v-col data-cy="area-select-col">
              <v-text-field
                v-if="parent"
                data-cy="area-code-input"
                :value="getResponseValue('area.site.code', modelItem)"
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
            <v-col>
              <v-text-field
                data-cy="site-name-input"
                :value="getResponseValue('area.site.name', modelItem) || getResponseValue('site.name', modelItem)"
                label="site name"
                readonly
              />
            </v-col>
            <v-col>
              <v-text-field
                data-cy="area-name-input"
                :value="getResponseValue('area.name', modelItem)"
                label="area name"
                readonly
              />
            </v-col>
            <v-col data-cy="square-input-col">
              <v-text-field
                v-model="modelItem.square"
                label="square"
                required
                :error-messages="squareErrors"
                @input="$v.modelItem.square.$touch()"
                @blur="$v.modelItem.square.$touch()"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col data-cy="year-select-col">
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
            <v-col />
            <v-col />
          </v-row>
          <v-row dense>
            <v-col data-cy="type-select-col">
              <select-vocabulary-autocomplete
                label="type"
                :select.sync="modelItem.type"
                :error-messages="typeErrors"
                vocabulary-name="type"
                v-on="$listeners"
                @input="$v.modelItem.type.$touch()"
                @blur="$v.modelItem.type.$touch()"
              />
            </v-col>
            <v-col data-cy="preservation-select-col">
              <select-vocabulary-autocomplete
                label="preservation"
                :select.sync="modelItem.preservationState"
                vocabulary-name="preservationState"
                v-on="$listeners"
              />
            </v-col>
          </v-row>
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
                label="summary"
                data-cy="su-interpretation-input"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col data-cy="top-elevation-col">
              <v-text-field
                v-model="modelItem.topElevation"
                label="top elevation (m)"
                :error-messages="topElevationErrors"
                @input="$v.modelItem.topElevation.$touch()"
                @blur="$v.modelItem.topElevation.$touch()"
              />
            </v-col>
            <v-col data-cy="bottom-elevation-col">
              <v-text-field
                v-model="modelItem.bottomElevation"
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
      </v-container>
    </v-card-text>
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
    years() {
        const start = 2000;
        const end = (new Date()).getFullYear();
        return [...Array(end - start + 1).keys()].map(x => x + start);
    },
    requestData() {
      const data = normalizeRequestBodyData(this.updateItem)
      for (const key of [
        'area',
        'type',
        'preservationState',
      ]) {
        if (has(key, data)) {
          data[key] = this.normalizeResource(key)
        }
      }
      for (const key of [
        'number',
        'topElevation',
        'bottomElevation',
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
