<template>
  <v-card>
    <v-toolbar flat dense>
      <v-toolbar-title>Stratigraphic unit</v-toolbar-title>
      <v-spacer />
      <v-toolbar-title  v-if="code"><strong class="secondary--text">{{code}}</strong></v-toolbar-title>
      <template #extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tab>Data</v-tab>
          <v-tab>Relationships</v-tab>
          <v-tab>Pottery</v-tab>
          <v-tab>Cumulative pottery</v-tab>
          <v-tab>Small finds</v-tab>
          <v-tab>Ecofacts</v-tab>
          <v-tab>Images</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item>
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
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          Relationships
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          Pottery
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          Cumulative pottery
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          Small finds
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
         Ecofacts
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          Images
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import {isEmpty} from 'ramda'
import ResourceItemFormCollection from "@/mixins/ResourceItemFormCollection";
export default {
  name: "AppSuPage",
  mixins: [
    ResourceItemFormCollection
  ],
  data() {
    return {
      panels: [
        0,1,2
      ],
      tab: null
    }
  },
  computed: {
    resourceName() {
      return 'stratigraphic_units'
    },
    code() {
      return isEmpty(this.responseData) ? '' : `${this.responseData.site.code}.${this.responseData.number}`
    }
  }
}
</script>

<style scoped>

</style>
