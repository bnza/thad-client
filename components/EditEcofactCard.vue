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
            sm="3"
          >
            <v-text-field
              class="mx-4 secondary--text font-weight-bold" color="secondary"
              :value="isUpdate ? formatCode('ecofact', item) : undefined"
              label="code"
              disabled
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col data-cy="su-select-col" sm="3">
            <v-text-field
              v-if="parent"
              data-cy="su-code-input"
              :value="formatCode('stratigraphicUnit', parent)"
              label="SU number"
              disabled
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
          <v-col data-cy="number-input-col" sm="3">
            <v-text-field
              v-model="modelItem.number"
              label="identification number"
              required
              :error-messages="numberErrors"
              :disabled="updateCodeDisabled"
              class="mx-4 secondary--text font-weight-bold"
              color="secondary"
              @input="$v.modelItem.number.$touch()"
              @blur="$v.modelItem.number.$touch()"
            />
          </v-col>
          <v-col sm="3" />
          <v-col sm="3">
            <select-date-menu
              label="date of collection"
              :date.sync="modelItem.collectionDate"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col data-cy="type-select-col" sm="3">
            <select-vocabulary-autocomplete
              label="type"
              :error-messages="typeErrors"
              :select.sync="modelItem.type"
              class="mx-4"
              vocabulary-name="ecofactType"
              v-on="$listeners"
              @input="$v.modelItem.type.$touch()"
              @blur="$v.modelItem.type.$touch()"
            />
          </v-col>
          <v-col data-cy="preservation-state-select-col" sm="3">
            <select-vocabulary-autocomplete
              label="preservation"
              :select.sync="modelItem.preservationState"
              class="mx-4"
              vocabulary-name="preservationState"
              v-on="$listeners"
            />
          </v-col>
          <v-col data-cy="quantity-input-col" sm="3">
            <v-text-field
              v-model="modelItem.quantity"
              label="number of ecofact collected"
              required
              :error-messages="quantityErrors"
              class="mx-4"
              @input="$v.modelItem.quantity.$touch()"
              @blur="$v.modelItem.quantity.$touch()"
            />
          </v-col>
          <v-col data-cy="selected-input-col" sm="3">
            <v-checkbox
              v-model="modelItem.selectedForAnalysis"
              label="selected for analysis"
              class="mx-4"
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
        </v-row>
        <v-row dense>
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
          <v-col />
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
              label="note"
              class="mx-4"
              data-cy="pottery-description-input"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col sm="3" data-cy="compiler-select-col">
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
          <v-col sm="3">
            <select-date-menu :date.sync="modelItem.date" />
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
import ResourceValidationEcofactMixin from "@/mixins/validation/ResourceValidationEcofactMixin";
import ResourceItemEditMixin from "@/mixins/ResourceItemEditMixin";
import ResourceCollectionParentMixin from "@/mixins/ResourceCollectionParentMixin";
import {normalizeRequestBodyData} from "@/src/request";


export default {
  name: "EditEcofactCard",
  mixins: [
    ResourceItemDataAccessorMixin,
    ResourceNavigationMixin,
    ResourceValidationEcofactMixin,
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
      ]) {
        if (has(key, data)) {
          data[key] = this.normalizeResource(key)
        }
      }
      for (const key of [
        'number',
        'quantity',
        'length',
        'height',
        'width',
        'thickness',
        'minDiameter',
        'maxDiameter',
        'weight'
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
