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
                  :value="getResponseValue('site.code')"
                  label="code"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('site.name')"
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
                  :value="getResponseValue('area.code')"
                  label="code"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('area.name')"
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
                  :value="code"
                  label="code"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('number')"
                  label="number"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-text-field
                  :value="getResponseValue('type.value')"
                  label="type"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('preservationState.value')"
                  label="state of preservation"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-textarea
                  :value="getResponseValue('description')"
                  label="description"
                  readonly
                />
              </v-col>
              <v-col>
                <v-textarea
                  :value="getResponseValue('summary')"
                  label="summary"
                  readonly
                />
              </v-col>
              <v-col>
                <v-textarea
                  :value="getResponseValue('interpretation')"
                  label="interpretation"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-text-field
                  :value="getResponseValue('compiler')"
                  label="compiler"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('areaSupervisor')"
                  label="name"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseDateString('date')"
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
import {isEmpty} from "ramda";
import ResourceItemFormMixin from "@/mixins/ResourceItemFormMixin";

export default {
  name: "ReadSusCard",
  mixins: [
    ResourceItemFormMixin
  ],
  data() {
    return {
      panels: [
        0,1,2
      ],
    }
  },
  computed: {
    resourceName() {
      return 'stratigraphic_units'
    },
    code() {
      return isEmpty(this.responseData) ? '' : `${this.responseData.site.code}.${this.responseData.number}`
    }
  },
}
</script>

<style scoped>

</style>
