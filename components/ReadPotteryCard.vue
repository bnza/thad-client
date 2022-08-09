<template>
      <v-expansion-panels
        v-model="panels"
        accordion
        multiple
      >
        <v-expansion-panel>
          <v-expansion-panel-header class="grey--text text-overline">Identification</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row dense>
              <v-col sm="4">
                <v-text-field
                  class="secondary--text font-weight-bold" color="secondary"
                  :value="formatCode('pottery', item)"
                  label="code"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col sm="2">
                <v-text-field
                  :value="formatCode('stratigraphicUnit', item.stratigraphicUnit)"
                  label="SU"
                  readonly
                >
                  <template #prepend>
                    <navigation-resource-read-button
                      :disabled="!getResponseValue('stratigraphicUnit.id', item)"
                      :item-id="getResponseValue('stratigraphicUnit.id', item)"
                      resource-name="stratigraphicUnit"
                    />
                  </template>
                </v-text-field>
              </v-col>
              <v-col sm="2">
                <v-text-field
                  class="secondary--text font-weight-bold" color="secondary"
                  :value="getResponseValue('number', item)"
                  label="identification number"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-text-field
                  :value="getResponseValue('ware.value', item)"
                  label="ware"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('preservation.value', item)"
                  label="preservation"
                  readonly
                />
              </v-col>
            <v-col>
              <v-text-field
                :value="getResponseValue('typology', item)"
                label="typology"
                readonly
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
                  label="period code"
                  readonly
                />
              </v-col>
              <v-col sm="3">
                <v-text-field
                  :value="getResponseValue('period.value', item)"
                  label="period"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col sm="1">
                <v-text-field
                  :value="getResponseValue('subperiod.code', item)"
                  label="subperiod code"
                  readonly
                />
              </v-col>
              <v-col sm="3">
                <v-text-field
                  :value="getResponseValue('subperiod.value', item)"
                  label="subperiod"
                  readonly
                />
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="grey--text text-overline">Technological characteristics</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row dense>
              <v-col>
                <v-text-field
                  :value="getResponseValue('manufacturingTechnique.value', item)"
                  label="manufacturing technique"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('firing.value', item)"
                  label="firing"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('fabric.value', item)"
                  label="fabric"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-text-field
                  :value="getResponseValue('surfaceCharacteristic.value', item)"
                  label="surface characteristic"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('surfaceTreatment.value', item)"
                  label="surface treatment"
                  readonly
                />
              </v-col>
              <v-col>
                <v-select
                  :value="decorations"
                  :items="decorations"
                  label="decorations"
                  readonly
                  multiple
                />
              </v-col>
          </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="grey--text text-overline">Colour</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row dense>
              <v-col>
                <v-text-field
                  :value="getResponseValue('externalSurfaceColour.value', item)"
                  label="external surface colour"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('internalSurfaceColour.value', item)"
                  label="internal surface colour"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('fractureColour.value', item)"
                  label="fracture colour"
                  readonly
                />
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="grey--text text-overline">Morphology</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col sm="4">
                <v-text-field
                  :value="getResponseValue('vesselShape.value', item)"
                  label="shape"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-text-field
                  :value="getResponseValue('body.value', item)"
                  label="body/wall"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('spout.value', item)"
                  label="spout"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('handle.value', item)"
                  label="handle/lug/suspender"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-text-field
                  :value="getResponseValue('rimShape.value', item)"
                  label="rim shape"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('rimCharacterization.value', item)"
                  label="rim characterization"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('rimDirection.value', item)"
                  label="rim direction"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col >
                <v-text-field
                  :value="getResponseValue('neck.value', item)"
                  label="neck"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('neckLength.value', item)"
                  label="neck length"
                  readonly
                />
              </v-col>
              <v-col />
            </v-row>
            <v-row dense>
              <v-col >
                <v-text-field
                  :value="getResponseValue('baseShape.value', item)"
                  label="base shape"
                  readonly
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
              <v-col>
                <v-text-field
                  :value="getResponseValue('sizeGroup.value', item)"
                  label="size group"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('thickness', item)"
                  label="thickness (cm)"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('rimDiameter', item)"
                  label="rim diameter (cm)"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('baseDiameter', item)"
                  label="base diameter (cm)"
                  readonly
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
                <v-text-field
                  :value="getResponseValue('notes', item)"
                  label="note"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-text-field
                  :value="getResponseValue('compiler', item)"
                  label="compiler"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('date', item).substring(0,10)"
                  label="date"
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
  name: "ReadPotteryCard",
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
        0,1,2,3,4,5,6
      ],
    }
  },
  computed: {
    decorations() {
      return (this.getResponseValue('decorations', this.item) || []).map(i => i.decoration.value)
    }
  }
}
</script>
