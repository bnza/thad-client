<template>
  <v-expansion-panels
    v-model="panels"
    accordion
    multiple
    flat
  >
    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text text-overline">Location</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row dense>
          <v-col sm="4">
            <v-text-field
              :value="getResponseValue('area.site.code', item)"
              label="site code"
              readonly
            />
          </v-col>
          <v-col sm="4">
            <v-text-field
              :value="getResponseValue('area.site.name', item)"
              label="site name"
              readonly
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col sm="4">
            <v-text-field
              :value="getResponseValue('area.code', item)"
              label="area code"
              readonly
            />
          </v-col>
          <v-col sm="4">
            <v-text-field
              :value="getResponseValue('area.name', item)"
              label="area name"
              readonly
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col sm="4">
            <v-text-field
              :value="getResponseValue('building', item)"
              label="building"
              readonly
            />
          </v-col>
          <v-col sm="4">
            <v-text-field
              :value="getResponseValue('buildingPhase', item)"
              label="building phase"
              readonly
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col sm="4">
            <v-text-field
              :value="getResponseValue('room', item)"
              label="room"
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
              :value="formatCode('grave', item)"
              label="code"
              readonly
            />
          </v-col>
          <v-col sm="4">
            <v-text-field
              :value="getResponseValue('year', item)"
              label="year"
              readonly
            />
          </v-col>
          <v-col sm="4">
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
              :value="getResponseValue('ritual.value', item)"
              label="ritual"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('isDepositionSecondary', item) ? 'secondary' : 'primary'"
              label="deposition"
              readonly
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              :value="getResponseValue('alignment', item)"
              label="alignment"
              readonly
            />
          </v-col>
          <v-col />
          <v-col>
            <v-text-field
              :value="getResponseValue('preservationState.value', item)"
              label="preservation"
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
          <v-col>
            <v-text-field
              :value="getResponseValue('period.value', item)"
              label="period"
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              :value="getResponseValue('phase', item)"
              label="phase"
              readonly
            />
          </v-col>
          <v-col>
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
      <v-expansion-panel-header class="grey--text text-overline">Stratigraphy</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row dense>
          <v-col>
            <v-text-field
              :value="formatCode('stratigraphicUnit', getResponseValue('cutStratigraphicUnit', item))"
              label="cut SU"
              readonly
            >
              <template #prepend>
                <navigation-resource-read-button
                  :disabled="!getResponseValue('cutStratigraphicUnit.id', item)"
                  :item-id="getResponseValue('cutStratigraphicUnit.id', item)"
                  resource-name="stratigraphicUnit" />
              </template>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              :value="formatCode('stratigraphicUnit', getResponseValue('fillStratigraphicUnit', item))"
              label="fill SU"
              readonly
            >
              <template #prepend>
                <navigation-resource-read-button
                  :disabled="!getResponseValue('fillStratigraphicUnit.id', item)"
                  :item-id="getResponseValue('fillStratigraphicUnit.id', item)"
                  resource-name="stratigraphicUnit"
                />
              </template>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              :value="formatCode('stratigraphicUnit', getResponseValue('skeletonStratigraphicUnit', item))"
              label="skeleton SU"
              readonly
            >
              <template #prepend>
                <navigation-resource-read-button
                  :disabled="!getResponseValue('skeletonStratigraphicUnit.id', item)"
                  :item-id="getResponseValue('skeletonStratigraphicUnit.id', item)"
                  resource-name="stratigraphicUnit"
                />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              :value="formatCode('stratigraphicUnit', getResponseValue('earlierThan', item))"
              label="earlier than"
              readonly
            >
              <template #prepend>
                <navigation-resource-read-button
                  :disabled="!getResponseValue('earlierThan.id', item)"
                  :item-id="getResponseValue('earlierThan.id', item)"
                  resource-name="stratigraphicUnit"
                />
              </template>
            </v-text-field>
          </v-col>
          <v-col />
          <v-col>
            <v-text-field
              :value="formatCode('stratigraphicUnit', getResponseValue('laterThan', item))"
              label="earlier than"
              readonly
            >
              <template #prepend>
                <navigation-resource-read-button
                  :disabled="!getResponseValue('laterThan.id', item)"
                  :item-id="getResponseValue('laterThan.id', item)"
                  resource-name="stratigraphicUnit"
                />
              </template>
            </v-text-field>
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
</template>

<script>
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";

export default {
  name: "ReadGraveCard",
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
  }
}
</script>
