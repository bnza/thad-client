<template>
      <v-expansion-panels
        v-model="panels"
        accordion
        multiple
      >
        <v-expansion-panel>
          <v-expansion-panel-header class="grey--text text-overline">Location</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row dense>
              <v-col sm="2">
                <v-text-field
                  data-cy="site-code-input"
                  :value="getResponseValue('stratigraphicUnit.site.code', item)"
                  label="site code"
                  readonly
                />
              </v-col>
              <v-col sm="4">
                <v-text-field
                  data-cy="site-name-input"
                  :value="getResponseValue('stratigraphicUnit.site.name', item)"
                  label="site name"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col sm="2">
                <v-text-field
                  data-cy="site-code-input"
                  :value="getResponseValue('stratigraphicUnit.area.name', item)"
                  label="area code"
                  readonly
                />
              </v-col>
              <v-col sm="4">
                <v-text-field
                  data-cy="site-name-input"
                  :value="getResponseValue('stratigraphicUnit.area.name', item)"
                  label="area name"
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
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col sm="2">
                <v-text-field
                  :value="getResponseValue('coordN', item)"
                  label="north (meters)"
                  hint="North projected coordinate value in meters (WGS 84 / UTM zone 38N)"
                  :persistent-hint="true"
                  readonly
                />
              </v-col>
              <v-col sm="2">
                <v-text-field
                  :value="getResponseValue('coordE', item)"
                  hint="East projected coordinate value in meters (WGS 84 / UTM zone 38N)"
                  :persistent-hint="true"
                  label="east (meters)"
                  readonly
                />
              </v-col>
              <v-col sm="2">
                <v-text-field
                  :value="getResponseValue('coordZ', item)"
                  label="elevation (meters)"
                  readonly
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
                  class="secondary--text font-weight-bold" color="secondary"
                  :value="formatCode('smallFind', item)"
                  label="code"
                  readonly
                />
              </v-col>
              <v-col sm="2" />
              <v-col sm="2">
                <v-text-field
                  class="secondary--text font-weight-bold" color="secondary"
                  :value="getResponseValue('number', item)"
                  label="identification number"
                  readonly
                />
              </v-col>
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
              <v-spacer />
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
            <v-row dense>
              <v-col>
                <v-text-field
                  :value="getResponseValue('type.value', item)"
                  label="type"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('material.value', item)"
                  label="material"
                  readonly
                />
              </v-col>
              <v-col sm="2" />
              <v-col sm="4">
                <v-select
                  :value="decorations"
                  :items="decorations"
                  label="decorations"
                  readonly
                  multiple
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-text-field
                  :value="getResponseValue('preservation.value', item)"
                  label="preservation"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('preservationState.value', item)"
                  label="preservation state"
                  readonly
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
          <v-expansion-panel-header class="grey--text text-overline">Measures</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row dense>
              <v-col>
                <v-text-field
                  :value="getResponseValue('length', item)"
                  label="length (cm)"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('height', item)"
                  label="height (cm)"
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
                  :value="getResponseValue('weight', item)"
                  label="weight (g)"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-text-field
                  :value="getResponseValue('width', item)"
                  label="width (cm)"
                  readonly
                />
              </v-col>
              <v-col />
              <v-col>
                <v-text-field
                  :value="getResponseValue('minWidth', item)"
                  label="min width (cm)"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('maxWidth', item)"
                  label="max width (cm)"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-text-field
                  :value="getResponseValue('baseDiameter', item)"
                  label="base diameter (cm)"
                  readonly
                />
              </v-col>
              <v-col />
              <v-col>
                <v-text-field
                  :value="getResponseValue('minDiameter', item)"
                  label="min diameter (cm)"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('maxDiameter', item)"
                  label="max diameter (cm)"
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
                <v-textarea
                  :value="getResponseValue('description', item)"
                  label="description"
                  readonly
                />
              </v-col>
              <v-col>
                <v-textarea
                  :value="getResponseValue('notes', item)"
                  label="notes"
                  readonly
                />
              </v-col>
              <v-col>
                <v-textarea
                  :value="getResponseValue('summary', item)"
                  label="summary"
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
              <v-col />
              <v-col />
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
  name: "ReadSmallFindCard",
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
        0,1,2,3,4
      ],
    }
  },
  computed: {
    decorations() {
      return (this.getResponseValue('decorations', this.item) || []).map(i => i.decoration.value)
    }
  },
}
</script>
