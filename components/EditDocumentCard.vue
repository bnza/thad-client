<template>
  <v-expansion-panels
    v-model="panels"
    accordion
    multiple
    flat
    disabled
  >
    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text text-overline">Media</v-expansion-panel-header>
      <lazy-item-media-object-expansion-panel-content v-if="isUpdate" :item="item" />
      <v-expansion-panel-content v-else>
        <v-row dense>
          <v-spacer />
          <v-col data-cy="su-select-col" sm="3">
            <edit-media-object-card-text ref="media" resource-name="mediaObject"/>
          </v-col>
          <v-spacer />
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text text-overline">Identification</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row dense>
          <v-col sm="3">
            <v-text-field
              class="mx-4"
              :value="getResponseValue('site.code', item)"
              label="site code"
              disabled
            />
          </v-col>
          <v-col sm="3">
            <v-text-field
              class="mx-4"
              :value="getResponseValue('site.name', item)"
              label="site name"
              disabled
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col data-cy="area-select-col" sm="3">
            <v-text-field
              v-if="parent"
              data-cy="area-code-input"
              :value="getResponseValue('area.site.code', modelItem)"
              class="mx-4"
              label="area code"
              disabled
            />
            <select-areas-autocomplete
              v-else
              :select.sync="modelItem.area"
              :error-messages="areaErrors"
              :disabled="updateCodeDisabled"
              class="mx-4"
              v-on="$listeners"
              @input="$v.modelItem.area.$touch()"
              @blur="$v.modelItem.area.$touch()"
            />
          </v-col>
          <v-col sm="3">
            <v-text-field
              class="mx-4"
              :value="getResponseValue('area.name', item)"
              label="area name"
              disabled
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col sm="3">
            <v-text-field
              v-if="isUpdate"
              class="secondary--text font-weight-bold mx-4" color="secondary"
              :value="formatCode('document', item)"
              label="code"
              disabled
            />
          </v-col>
          <v-col
            data-cy="year-select-col"
            sm="3"
          >
            <v-autocomplete
              v-model="modelItem.year"
              label="year"
              required
              :items="years"
              :error-messages="yearErrors"
              :disabled="updateCodeDisabled"
              class="mx-4"
              @input="$v.modelItem.year.$touch()"
              @blur="$v.modelItem.year.$touch()"
            />
          </v-col>
          <v-col
            data-cy="number-input-col"
            sm="3"
          >
            <v-text-field
              v-model="modelItem.number"
              label="identification number"
              required
              :disabled="updateCodeDisabled"
              :error-messages="numberErrors"
              class="mx-4"
              @input="$v.modelItem.number.$touch()"
              @blur="$v.modelItem.number.$touch()"
            />
          </v-col>
          <v-col
            data-cy="type-select-col"
            sm="3"
          >
            <select-vocabulary-autocomplete
              label="type"
              :select.sync="modelItem.type"
              :error-messages="typeErrors"
              vocabulary-name="documentType"
              class="mx-4"
              v-on="$listeners"
              @input="$v.modelItem.type.$touch()"
              @blur="$v.modelItem.type.$touch()"
            />
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="grey--text text-overline">Misc</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row dense>
          <v-col data-cy="description-select-col">
            <v-textarea
              v-model="modelItem.description"
              label="description"
              class="mx-4"
            />
          </v-col>
          <v-col data-cy="interpretation-select-col">
            <v-textarea
              v-model="modelItem.interpretation"
              label="interpretation"
              class="mx-4"
            />
          </v-col>
          <v-col>
            <v-textarea
              v-model="modelItem.summary"
              label="summary"
              class="mx-4"
              data-cy="summary-input"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col data-cy="creator-select-col">
            <select-nominatives-autocomplete
              label="creator"
              :select.sync="modelItem.creator"
              :error-messages="creatorErrors"
              :disabled="updateCodeDisabled"
              class="mx-4"
              v-on="$listeners"
              @input="$v.modelItem.creator.$touch()"
              @blur="$v.modelItem.creator.$touch()"
            />
          </v-col>
          <v-col
            sm="4"
            data-cy="supervisor-input"
          >
            <v-text-field
              v-model="modelItem.areaSupervisor"
              label="supervisor"
              class="mx-4"
            />
          </v-col>
          <v-col sm="4">
            <select-date-menu :date.sync="modelItem.date" />
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import {mapActions} from "vuex";
import {clone, has} from "ramda";
import Vue from "vue";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
import ResourceValidationDocumentMixin from "@/mixins/validation/ResourceValidationDocumentMixin";
import ResourceItemEditMixin from "@/mixins/ResourceItemEditMixin";
import ResourceCollectionParentMixin from "@/mixins/ResourceCollectionParentMixin";
import {normalizeRequestBodyData} from "@/src/request";
import {yearsRange} from "@/src/utils";

export default {
  name: "EditDocumentCard",
  mixins: [
    ResourceItemDataAccessorMixin,
    ResourceNavigationMixin,
    ResourceValidationDocumentMixin,
    ResourceCollectionParentMixin,
    ResourceItemEditMixin
  ],
  data() {
    return {
      dateMenu: false,
      modelItem: {
        area: {},
        date: new Date().toISOString().substring(0, 10),
      },
      panels: [
        0,1,2,3,4,5
      ],
      numericProps: [
        'number',
        'year',
      ]
    }
  },
  computed: {
    years: () => yearsRange(),
    requestData() {
      const data = normalizeRequestBodyData(this.updateItem)
      for (const key of [
        'area',
        'type',
        'mediaObject',
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
          this.modelItem.area = clone(parent)
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('http', ['isUniqueNumberInSite']),
    async beforeSubmit() {
      const mediaObjectIsInvalid =  await this.$refs.media?.isInvalid()
      if (this.isUpdate) {
        return
      }
      if (mediaObjectIsInvalid) {
        return
      }
      const documentIsInvalid = await this.partialValidate({exclude: ['mediaObject']})
      if (documentIsInvalid) {
        return
      }
      const mediaObject = await this.$refs.media.submit()
      Vue.set(this.modelItem, 'mediaObject', mediaObject)
    },
  }
}
</script>
