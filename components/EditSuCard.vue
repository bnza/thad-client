<template>
    <v-card-text>
        <v-container>
          <v-row dense>
            <v-col data-cy="area-select-col">
              <select-areas-autocomplete
                :select.sync="modelItem.area"
                :error-messages="areaErrors"
                class="mx-4"
                v-on="$listeners"
                @input="$v.modelItem.area.$touch()"
                @blur="$v.modelItem.area.$touch()"
              />
            </v-col>
            <v-text-field
              data-cy="area-name-input"
              :value="getResponseValue('area.site.name', modelItem)"
              label="site name"
              readonly
              class="mx-4"
            />
            <v-text-field
              data-cy="site-name-input"
              :value="getResponseValue('area.name', modelItem)"
              label="area name"
              readonly
              class="mx-4"
            />
            <v-col data-cy="number-input-col">
              <v-text-field
                v-model="modelItem.number"
                label="number"
                required
                :error-messages="numberErrors"
                class="mx-4"
                @input="$v.modelItem.number.$touch()"
                @blur="$v.modelItem.number.$touch()"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col data-cy="site-select-col">
              <select-vocabulary-autocomplete
                label="type"
                :select.sync="modelItem.type"
                :error-messages="typeErrors"
                class="mx-4"
                vocabulary-name="su_types"
                v-on="$listeners"
                @input="$v.modelItem.type.$touch()"
                @blur="$v.modelItem.type.$touch()"
              />
            </v-col>
            <v-col data-cy="site-select-col">
              <select-vocabulary-autocomplete
                label="preservation"
                :select.sync="modelItem.preservationState"
                class="mx-4"
                vocabulary-name="su_preservation_states"
                v-on="$listeners"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-textarea
                v-model="modelItem.description"
                label="description"
                class="mx-4"
                data-cy="area-description-input"
              />
            </v-col>
            <v-col>
              <v-textarea
                v-model="modelItem.summary"
                label="summary"
                class="mx-4"
                data-cy="area-summary-input"
              />
            </v-col>
            <v-col>
              <v-textarea
                v-model="modelItem.interpretation"
                label="summary"
                class="mx-4"
                data-cy="area-interpretation-input"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-text-field
                v-model="modelItem.topElevation"
                label="top elevation (m)"
                :error-messages="topElevationErrors"
                class="mx-4"
                @input="$v.modelItem.topElevation.$touch()"
                @blur="$v.modelItem.topElevation.$touch()"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="modelItem.bottomElevation"
                label="bottom elevation (m)"
                :error-messages="bottomElevationErrors"
                class="mx-4"
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
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="modelItem.areaSupervisor"
                label="supervisor"
                class="mx-4"
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
import {has, hasPath} from "ramda";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
import ResourceValidationSuMixin from "@/mixins/validation/ResourceValidationSuMixin";
import ResourceItemEditMixin from "@/mixins/ResourceItemEditMixin";
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
    ResourceItemEditMixin
  ],
  data() {
    return {
      dateMenu: false,
      modelItem: {
        area: {},
        type: {},
        preservationState: {},
        date: new Date().toISOString().substring(0, 10),
      },
    }
  },
  computed: {
    requestData() {
      const data = normalizeRequestBodyData(this.updateItem)
      if (has('area', data)) {
        data.area = data.area['@id']
      }
      if (hasPath(['area','site'], data)) {
        data.site = data.area.site['@id']
      }
      if (has('type', data)) {
        data.type = data.type ? data.type['@id'] : null
      }
      if (has('preservationState', data)) {
        data.preservationState = data.preservationState ? data.preservationState['@id'] : null
      }
      if (has('topElevation', data)) {
        data.topElevation = 1 * data.bottomElevation
      }
      if (has('bottomElevation', data)) {
        data.bottomElevation = 1 * data.bottomElevation
      }
      if (has('number', data)) {
        data.number = 1 * data.number
      }
      return data
    }
  }
}
</script>

<style scoped>

</style>
