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
              v-on="$listeners"
              @input="$v.modelItem.stratigraphicUnit.$touch()"
              @blur="$v.modelItem.stratigraphicUnit.$touch()"
            />
          </v-col>
          <v-col data-cy="number-input-col" sm="2">
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
          <v-col data-cy="type-select-col">
            <select-vocabulary-autocomplete
              label="type"
              :error-messages="typeErrors"
              :select.sync="modelItem.type"
              class="mx-4"
              vocabulary-name="objectType"
              v-on="$listeners"
              @input="$v.modelItem.type.$touch()"
              @blur="$v.modelItem.type.$touch()"
            />
          </v-col>
          <v-col data-cy="material-select-col">
            <select-vocabulary-autocomplete
              label="material"
              :error-messages="materialErrors"
              :select.sync="modelItem.material"
              class="mx-4"
              vocabulary-name="material"
              v-on="$listeners"
              @input="$v.modelItem.material.$touch()"
              @blur="$v.modelItem.material.$touch()"
            />
          </v-col>
          <v-col />
          <v-col data-cy="decoration-select-col">
            <select-vocabulary-autocomplete
              label="decoration"
              :select.sync="modelItem.decoration"
              class="mx-4"
              vocabulary-name="decoration"
              v-on="$listeners"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col data-cy="preservation-select-col">
            <select-vocabulary-autocomplete
              label="preservation"
              :error-messages="preservationErrors"
              :select.sync="modelItem.preservation"
              class="mx-4"
              vocabulary-name="objectPreservation"
              v-on="$listeners"
              @input="$v.modelItem.preservation.$touch()"
              @blur="$v.modelItem.preservation.$touch()"
            />
          </v-col>
          <v-col data-cy="preservation-state-select-col">
            <select-vocabulary-autocomplete
              label="preservationState"
              :select.sync="modelItem.preservationState"
              class="mx-4"
              vocabulary-name="preservationState"
              v-on="$listeners"
            />
          </v-col>
          <v-col />
          <v-col />
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text text-overline">Colour</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row dense>
          <v-col data-cy="ext-colour-select-col">
            <select-vocabulary-autocomplete
              label="external surface colour"
              :select.sync="modelItem.externalSurfaceColour"
              class="mx-4"
              vocabulary-name="objectColour"
              v-on="$listeners"
            />
          </v-col>
          <v-col data-cy="int-colour-select-col">
            <select-vocabulary-autocomplete
              label="internal surface colour"
              :select.sync="modelItem.internalSurfaceColour"
              class="mx-4"
              vocabulary-name="objectColour"
              v-on="$listeners"
            />
          </v-col>
          <v-col data-cy="fracture-colour-select-col">
            <select-vocabulary-autocomplete
              label="fracture colour"
              :select.sync="modelItem.fractureColour"
              class="mx-4"
              vocabulary-name="objectColour"
              v-on="$listeners"
            />
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text text-overline">Measures</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row dense>
          <v-col data-cy="length-input-col">
            <v-text-field
              v-model="modelItem.length"
              label="length (cm)"
              required
              :error-messages="lengthErrors"
              class="mx-4"
              @input="$v.modelItem.length.$touch()"
              @blur="$v.modelItem.length.$touch()"
            />
          </v-col>
          <v-col data-cy="height-input-col">
            <v-text-field
              v-model="modelItem.height"
              label="height (cm)"
              required
              :error-messages="heightErrors"
              class="mx-4"
              @input="$v.modelItem.height.$touch()"
              @blur="$v.modelItem.height.$touch()"
            />
          </v-col>
          <v-col data-cy="thickness-input-col">
            <v-text-field
              v-model="modelItem.thickness"
              label="thickness (cm)"
              required
              :error-messages="thicknessErrors"
              class="mx-4"
              @input="$v.modelItem.thickness.$touch()"
              @blur="$v.modelItem.thickness.$touch()"
            />
          </v-col>
          <v-col data-cy="weight-input-col">
            <v-text-field
              v-model="modelItem.weight"
              label="weight (g)"
              required
              :error-messages="weightErrors"
              class="mx-4"
              @input="$v.modelItem.weight.$touch()"
              @blur="$v.modelItem.weight.$touch()"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col data-cy="width-input-col">
            <v-text-field
              v-model="modelItem.width"
              label="width (cm)"
              required
              :error-messages="widthErrors"
              class="mx-4"
              @input="$v.modelItem.width.$touch()"
              @blur="$v.modelItem.width.$touch()"
            />
          </v-col>
          <v-col />
          <v-col data-cy="min-width-input-col">
            <v-text-field
              v-model="modelItem.minWidth"
              label="min width (cm)"
              required
              :error-messages="minWidthErrors"
              class="mx-4"
              @input="$v.modelItem.minWidth.$touch()"
              @blur="$v.modelItem.minWidth.$touch()"
            />
          </v-col>
          <v-col data-cy="max-width-input-col">
            <v-text-field
              v-model="modelItem.maxWidth"
              label="max width (cm)"
              required
              :error-messages="maxWidthErrors"
              class="mx-4"
              @input="$v.modelItem.maxWidth.$touch()"
              @blur="$v.modelItem.maxWidth.$touch()"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col data-cy="base-diameter-input-col">
            <v-text-field
              v-model="modelItem.baseDiameter"
              label="base diameter (cm)"
              required
              :error-messages="baseDiameterErrors"
              class="mx-4"
              @input="$v.modelItem.baseDiameter.$touch()"
              @blur="$v.modelItem.baseDiameter.$touch()"
            />
          </v-col>
          <v-col />
          <v-col data-cy="min-diameter-input-col">
            <v-text-field
              v-model="modelItem.minDiameter"
              label="min diameter (cm)"
              required
              :error-messages="minDiameterErrors"
              class="mx-4"
              @input="$v.modelItem.minDiameter.$touch()"
              @blur="$v.modelItem.minDiameter.$touch()"
            />
          </v-col>
          <v-col data-cy="max-diameter-input-col">
            <v-text-field
              v-model="modelItem.maxDiameter"
              label="max diameter (cm)"
              required
              :error-messages="maxDiameterErrors"
              class="mx-4"
              @input="$v.modelItem.maxDiameter.$touch()"
              @blur="$v.modelItem.maxDiameter.$touch()"
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
              label="description"
              class="mx-4"
              data-cy="description-input"
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
          <v-col>
            <v-textarea
              v-model="modelItem.notes"
              label="note"
              class="mx-4"
              data-cy="notes-input"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col sm="2" data-cy="compiler-input">
            <v-text-field
              v-model="modelItem.compiler"
              label="compiler"
              class="mx-4"
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
import ResourceValidationSmallFindMixin from "@/mixins/validation/ResourceValidationSmallFindMixin";
import ResourceItemEditMixin from "@/mixins/ResourceItemEditMixin";
import ResourceCollectionParentMixin from "@/mixins/ResourceCollectionParentMixin";
import {normalizeRequestBodyData} from "@/src/request";


export default {
  name: "EditSmallFindCard",
  mixins: [
    ResourceItemDataAccessorMixin,
    ResourceNavigationMixin,
    ResourceValidationSmallFindMixin,
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
        'material',
        'decoration',
        'preservation',
        'internalSurfaceColour',
        'externalSurfaceColour',
        'fractureColour'
      ]) {
        if (has(key, data)) {
          data[key] = this.normalizeResource(key)
        }
      }
      for (const key of [
        'number',
        'length',
        'height',
        'thickness',
        'weight',
        'width',
        'minWidth',
        'maxWidth',
        'baseDiameter',
        'minDiameter',
        'maxDiameter',
      ]) {
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
