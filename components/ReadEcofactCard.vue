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
                  :value="formatCode('ecofact', item)"
                  label="code"
                  readonly
                />
              </v-col>
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
              <v-col sm="3"/>
              <v-col sm="3">
                <v-text-field
                  class="secondary--text font-weight-bold" color="secondary"
                  :value="getResponseValue('number', item)"
                  label="identification number"
                  readonly
                />
              </v-col>
              <v-col />
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
                  :value="getResponseValue('preservationState.value', item)"
                  label="preservation"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('quantity', item)"
                  label="number of ecofact collected"
                  readonly
                />
              </v-col>
              <v-col>
                <v-checkbox
                  label="selected for analysis"
                  :input-value="getResponseValue('selectedForAnalysis', item)"
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
                  :value="getResponseValue('width', item)"
                  label="width (cm)"
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
            </v-row>
            <v-row dense>
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
              <v-col>
                <v-text-field
                  :value="getResponseValue('weight', item)"
                  label="weight (g)"
                  readonly
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
  name: "ReadEcofactCard",
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
        0,1,2
      ],
    }
  }
}
</script>
