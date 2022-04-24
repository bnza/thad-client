<template>
  <v-card-text>
    <v-container>
      <v-expansion-panels
        v-model="panels"
        accordion
        multiple
      >
        <v-expansion-panel>
          <v-expansion-panel-header>Site</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row dense>
              <v-col>
                <v-text-field
                  :value="getResponseValue('site.code', item)"
                  label="code"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('site.name', item)"
                  label="name"
                  readonly
                />
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Area</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row dense>
              <v-col>
                <v-text-field
                  :value="getResponseValue('area.code', item)"
                  label="code"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('area.name', item)"
                  label="name"
                  readonly
                />
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Stratigraphic Unit</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row dense>
              <v-col>
                <v-text-field
                  class="secondary--text font-weight-bold" color="secondary"
                  :value="formatCode('stratigraphic_units', item)"
                  label="code"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('number', item)"
                  label="number"
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
                  :value="getResponseValue('preservationState.value', item)"
                  label="state of preservation"
                  readonly
                />
              </v-col>
            </v-row>
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
                  :value="getResponseValue('summary', item)"
                  label="summary"
                  readonly
                />
              </v-col>
              <v-col>
                <v-textarea
                  :value="getResponseValue('interpretation', item)"
                  label="interpretation"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-text-field
                  :value="getResponseValue('topElevation', item)"
                  label="top elevation (m)"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('bottomElevation', item)"
                  label="bottom elevation (m)"
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
                  :value="getResponseValue('areaSupervisor', item)"
                  label="supervisor"
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
    </v-container>
  </v-card-text>
</template>

<script>
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";

export default {
  name: "ReadSusCard",
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
        1,2
      ],
    }
  }
}
</script>
