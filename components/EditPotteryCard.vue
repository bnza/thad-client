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
          <v-col sm="4">
            <v-text-field
              class="mx-4 secondary--text font-weight-bold" color="secondary"
              :value="formatCode('pottery', item)"
              label="code"
              disabled
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col data-cy="pottery-select-col" sm="2">
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
              :disabled="updateCodeDisabled"
              class="mx-4"
              v-on="$listeners"
              @input="$v.modelItem.area.$touch()"
              @blur="$v.modelItem.area.$touch()"
            />
          </v-col>
          <v-col data-cy="number-input-col" sm="2">
            <v-text-field
              v-model="modelItem.number"
              :disabled="updateCodeDisabled"
              label="identification number"
              required
              :error-messages="numberErrors"
              class="mx-4"
              @input="$v.modelItem.number.$touch()"
              @blur="$v.modelItem.number.$touch()"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col data-cy="ware-select-col">
            <select-vocabulary-autocomplete
              label="ware"
              :select.sync="modelItem.ware"
              class="mx-4"
              vocabulary-name="ware"
              v-on="$listeners"
            />
          </v-col>
          <v-col data-cy="preservation-select-col">
            <select-vocabulary-autocomplete
              label="preservation"
              :select.sync="modelItem.preservation"
              class="mx-4"
              vocabulary-name="preservation"
              v-on="$listeners"
            />
          </v-col>
          <v-col>
            <select-typologies-autocomplete
              label="typology"
              :select.sync="modelItem.typology"
              class="mx-4"
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
        </v-row>
        <v-row dense>
          <v-col data-cy="subperiod-select-col" sm="4">
            <select-subperiod-vocabulary-autocomplete
              :period="modelItem.period || item.period"
              label="subperiod"
              :error-messages="subperiodErrors"
              :select.sync="modelItem.subperiod"
              class="mx-4"
              vocabulary-name="subperiod"
              @input="$v.modelItem.subperiod.$touch()"
              @blur="$v.modelItem.subperiod.$touch()"
              @select="$v.modelItem.subperiod.$touch()"
              v-on="$listeners"
            />
          </v-col>
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
              vocabulary-name="potteryColour"
              v-on="$listeners"
            />
          </v-col>
          <v-col data-cy="int-colour-select-col">
            <select-vocabulary-autocomplete
              label="internal surface colour"
              :select.sync="modelItem.internalSurfaceColour"
              class="mx-4"
              vocabulary-name="potteryColour"
              v-on="$listeners"
            />
          </v-col>
          <v-col data-cy="fracture-colour-select-col">
            <select-vocabulary-autocomplete
              label="fracture colour"
              :select.sync="modelItem.fractureColour"
              class="mx-4"
              vocabulary-name="potteryColour"
              v-on="$listeners"
            />
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text text-overline">Technological characteristics</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row dense>
          <v-col data-cy="manufacturing-technique-select-col">
            <select-vocabulary-autocomplete
              label="manufacturing technique"
              :select.sync="modelItem.manufacturingTechnique"
              class="mx-4"
              vocabulary-name="manufacturingTechnique"
              v-on="$listeners"
            />
          </v-col>
          <v-col data-cy="firing-select-col">
            <select-vocabulary-autocomplete
              label="firing"
              :select.sync="modelItem.firing"
              class="mx-4"
              vocabulary-name="firing"
              v-on="$listeners"
            />
          </v-col>
          <v-col data-cy="fabric-select-col">
            <select-vocabulary-autocomplete
              label="fabric"
              :select.sync="modelItem.fabric"
              class="mx-4"
              vocabulary-name="fabric"
              v-on="$listeners"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col data-cy="surface-characteristic-select-col">
            <select-vocabulary-autocomplete
              label="surface characteristic"
              :select.sync="modelItem.surfaceCharacteristic"
              class="mx-4"
              vocabulary-name="surfaceCharacteristic"
              v-on="$listeners"
            />
          </v-col>
          <v-col data-cy="surface-treatment-select-col">
            <select-vocabulary-autocomplete
              label="surface treatment"
              :select.sync="modelItem.surfaceTreatment"
              class="mx-4"
              vocabulary-name="surfaceTreatment"
              v-on="$listeners"
            />
          </v-col>
          <v-col />
        </v-row>
        <v-row>
          <collection-decorations-join-card
            v-if="ready && isUpdate"
            :parent="item"
            parent-request-filter-key="pottery.id"
            :enabled="true"
            resource-name="decorationPottery"
          >
            <delete-pottery-card-text :item="item" />
          </collection-decorations-join-card>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text text-overline">Morphology</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row dense>
          <v-col
            data-cy="vessel-shape-select-col"
          >
            <select-vocabulary-autocomplete
              label="shape"
              :select.sync="modelItem.vesselShape"
              class="mx-4"
              vocabulary-name="vesselShape"
              v-on="$listeners"
            />
          </v-col>
          <v-col />
          <v-col />
        </v-row>
        <v-row dense>
          <v-col data-cy="body-select-col">
            <select-vocabulary-autocomplete
              label="body"
              :select.sync="modelItem.body"
              class="mx-4"
              vocabulary-name="body"
              v-on="$listeners"
            />
          </v-col>
          <v-col data-cy="spout-select-col">
            <select-vocabulary-autocomplete
              label="spout"
              :select.sync="modelItem.spout"
              class="mx-4"
              vocabulary-name="spout"
              v-on="$listeners"
            />
          </v-col>
          <v-col data-cy="handle-select-col">
            <select-vocabulary-autocomplete
              label="handle/lug/suspender"
              :select.sync="modelItem.handle"
              class="mx-4"
              vocabulary-name="handle"
              v-on="$listeners"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col data-cy="rim-shape-select-col">
            <select-vocabulary-autocomplete
              label="rim shape"
              :select.sync="modelItem.rimShape"
              class="mx-4"
              vocabulary-name="rimShape"
              v-on="$listeners"
            />
          </v-col>
          <v-col data-cy="rim-characterization-select-col">
            <select-vocabulary-autocomplete
              label="rim characterization"
              :select.sync="modelItem.rimCharacterization"
              class="mx-4"
              vocabulary-name="rimCharacterization"
              v-on="$listeners"
            />
          </v-col>
          <v-col data-cy="rim-direction-select-col">
            <select-vocabulary-autocomplete
              label="rim direction"
              :select.sync="modelItem.rimDirection"
              class="mx-4"
              vocabulary-name="rimDirection"
              v-on="$listeners"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col data-cy="neck-select-col">
            <select-vocabulary-autocomplete
              label="neck"
              :select.sync="modelItem.neck"
              class="mx-4"
              vocabulary-name="neck"
              v-on="$listeners"
            />
          </v-col>
          <v-col data-cy="neck-length-select-col">
            <select-vocabulary-autocomplete
              label="neck length"
              :select.sync="modelItem.neckLength"
              class="mx-4"
              vocabulary-name="neckLength"
              v-on="$listeners"
            />
          </v-col>
          <v-col />
        </v-row>
        <v-row dense>
          <v-col data-cy="base-shape-select-col">
            <select-vocabulary-autocomplete
              label="base shape"
              :select.sync="modelItem.baseShape"
              class="mx-4"
              vocabulary-name="baseShape"
              v-on="$listeners"
            />
          </v-col>
          <v-col />
          <v-col />
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text text-overline">Measures</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row dense>
          <v-col data-cy="size-group-select-col">
            <select-vocabulary-autocomplete
              label="size group"
              :select.sync="modelItem.sizeGroup"
              class="mx-4"
              vocabulary-name="sizeGroup"
              v-on="$listeners"
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
          <v-col data-cy="rim-diameter-input-col">
            <v-text-field
              v-model="modelItem.rimDiameter"
              label="rim diameter (cm)"
              required
              :error-messages="rimDiameterErrors"
              class="mx-4"
              @input="$v.modelItem.rimDiameter.$touch()"
              @blur="$v.modelItem.rimDiameter.$touch()"
            />
          </v-col>
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
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text text-overline">Misc</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row dense>
          <v-col data-cy="note-input">
            <v-textarea
              v-model="modelItem.notes"
              label="notes"
              class="mx-4"
              data-cy="notes-input"
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
            <select-date-menu :date.sync="modelItem.date" />
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import {clone, has} from "ramda";
import {mapActions} from "vuex";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
import ResourceValidationPotteryMixin from "@/mixins/validation/ResourceValidationPotteryMixin";
import ResourceItemEditMixin from "@/mixins/ResourceItemEditMixin";
import ResourceCollectionParentMixin from "@/mixins/ResourceCollectionParentMixin";
import {normalizeRequestBodyData} from "@/src/request";


export default {
  name: "EditPotteryCard",
  mixins: [
    ResourceItemDataAccessorMixin,
    ResourceNavigationMixin,
    ResourceValidationPotteryMixin,
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
        0,1,2,3,4,5,6
      ],
      numericProps: [
        'number',
        'thickness',
        'baseDiameter',
        'rimDiameter'
      ]
    }
  },
  computed: {
    requestData() {
      const data = normalizeRequestBodyData(this.updateItem)
      for (const key of [
        'stratigraphicUnit',
        'period',
        'subperiod',
        'vesselShape',
        'ware',
        'preservation',
        'externalSurfaceColour',
        'internalSurfaceColour',
        'fractureColour',
        'manufacturingTechnique',
        'firing',
        'fabric',
        'surfaceCharacteristic',
        'surfaceTreatment',
        'decoration',
        'body',
        'spout',
        'handle',
        'rimShape',
        'rimCharacterization',
        'rimDirection',
        'neck',
        'neckLength',
        'baseShape',
        'sizeGroup'
      ]) {
        if (has(key, data)) {
          data[key] = this.normalizeResource(key)
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
    },
    modelItem(value, oldValue) {
      if (value.period && oldValue.period && value.period.id !== oldValue.period.id) {
        this.modelItem.subperiod = null
      }
    }
  },
  methods: {
    ...mapActions('http', ['isUniqueNumberInSU']),
  },
}
</script>

<style scoped>

</style>
