<template>
      <v-expansion-panels
        v-model="panels"
        accordion
        multiple
      >
        <v-expansion-panel>
          <v-expansion-panel-header class="grey--text text-overline">Media</v-expansion-panel-header>
<!--          <v-expansion-panel-content>
            <v-row>
              <v-spacer />
              <v-col>
                <media-object-filename-text-field :media="item" />
              </v-col>
              <v-spacer />
            </v-row>
            <v-row>
              <v-spacer />
              <v-col>
                <item-document-thumbnail-image
                  style="margin: auto"
                  :media="item"
                  :height="256"
                  :width="256"
                  @click="$emit('showPreview')"
                />
              </v-col>
              <v-spacer />
            </v-row>
          </v-expansion-panel-content>-->
          <lazy-item-media-object-expansion-panel-content :item="item" @click="$emit('showPreview')"/>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="grey--text text-overline">Identification</v-expansion-panel-header>
          <v-expansion-panel-content>
              <v-row dense>
                <v-col sm="3">
                  <v-text-field
                    :value="getResponseValue('site.code', item)"
                    label="site code"
                    readonly
                  />
                </v-col>
                <v-col sm="3">
                  <v-text-field
                    :value="getResponseValue('site.name', item)"
                    label="site name"
                    readonly
                  />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col sm="3">
                  <v-text-field
                    :value="getResponseValue('area.code', item)"
                    label="area code"
                    readonly
                  />
                </v-col>
                <v-col sm="3">
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
                  class="secondary--text font-weight-bold" color="secondary"
                  :value="formatCode('document', item)"
                  label="code"
                  readonly
                />
              </v-col>
              <v-col sm="3">
                <v-text-field
                  :value="getResponseValue('year', item)"
                  label="year"
                  readonly
                />
              </v-col>
              <v-col sm="3">
                <v-text-field
                  class="secondary--text font-weight-bold" color="secondary"
                  :value="getResponseValue('number', item)"
                  label="identification number"
                  readonly
                />
              </v-col>
              <v-col>
                <v-text-field
                  :value="getResponseValue('type.value', item)"
                  label="type"
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
              <v-col>
                <v-text-field
                  :value="getResponseValue('creator', item)"
                  label="creator"
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
  name: "ReadDocumentCard",
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
