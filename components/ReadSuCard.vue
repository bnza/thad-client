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
          <v-col sm="1">
            <v-text-field
              :value="getResponseValue('site.code', item)"
              label="site code"
              readonly
            />
          </v-col>
          <v-col sm="5">
            <v-text-field
              :value="getResponseValue('site.name', item)"
              label="site name"
              readonly
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col sm="1">
            <v-text-field
              :value="getResponseValue('area.code', item)"
              label="area code"
              readonly
            />
          </v-col>
          <v-col sm="5">
            <v-text-field
              :value="getResponseValue('area.name', item)"
              label="area name"
              readonly
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col sm="3">
            <v-text-field
              :value="getResponseValue('building', item)"
              label="building"
              readonly
            />
          </v-col>
          <v-col sm="3">
            <v-text-field
              :value="getResponseValue('buildingSubPhase', item)"
              label="building sub phase"
              readonly
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col sm="3">
            <v-text-field
              :value="getResponseValue('room', item)"
              label="room"
              readonly
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col sm="3">
            <v-text-field
              class="secondary--text font-weight-bold" color="secondary"
              :value="item.grave ? item.grave.appId : undefined"
              label="grave"
              readonly
            >
              <template v-if="item.grave" #prepend>
                <navigation-resource-read-button :item-id="getResponseValue('grave.id', item)" resource-name="grave" />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text text-overline">Identification</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row dense>
          <v-col>
            <v-text-field
              class="secondary--text font-weight-bold" color="secondary"
              :value="formatCode('stratigraphicUnit', item)"
              label="code"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('year', item)"
              label="excavation year"
              readonly
            />
          </v-col>
          <v-spacer />
          <v-col>
            <v-text-field
              :value="getResponseValue('number', item)"
              label="identification number"
              readonly
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col sm="3">
            <v-text-field
              :value="getResponseValue('type.value', item)"
              label="type"
              readonly
            />
          </v-col>
          <v-col sm="3">
            <v-text-field
              :value="getResponseValue('preservationState.value', item)"
              label="state of preservation"
              readonly
            />
          </v-col>
          <v-spacer />
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
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('period.value', item)"
              label="period"
              readonly
            />
          </v-col>
          <v-spacer />
          <v-col sm="2">
            <v-text-field
              :value="getResponseValue('phase', item)"
              label="phase"
              readonly
            />
          </v-col>
          <v-col sm="1">
            <v-text-field
              :value="getResponseValue('subPhase', item)"
              label="sub phase"
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
              :value="getResponseValue('interpretation', item)"
              label="interpretation"
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
          <v-col sm="4">
            <v-text-field
              :value="getResponseValue('topElevation', item)"
              label="top elevation (m)"
              readonly
            />
          </v-col>
          <v-col sm="4">
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
              label="compilation date"
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
  name: "ReadSusCard",
  mixins: [
    ResourceItemDataAccessorMixin
  ],
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    isChild: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      panels: [
        0,1,2,3
      ],
    }
  }
}
</script>
