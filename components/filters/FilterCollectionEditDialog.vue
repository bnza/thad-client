<template>
  <v-dialog
    fullscreen
    :value="visible"
  >
    <v-card>
      <v-card-title>
        <span v-if="isEdit">Edit filter</span><span v-else>Add filter</span>
        <v-spacer />
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              :disabled="!isValid"
              icon
              v-bind="attrs"
              data-cy="filter-add-btn"
              color="success"
              v-on="on"
              @click="add"
            >
              <v-icon class="mx-3">mdi-check</v-icon>
            </v-btn>
          </template>
          <span>Add</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              data-cy="filter-add-btn"
              v-on="on"
              @click="close"
            >
              <v-icon class="mx-3">mdi-close</v-icon>
            </v-btn>
          </template>
          <span>Cancel</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col sm="4">
              <v-autocomplete
                v-model="model.property"
                :items="isEdit ? applicableFilters : properties"
                item-text="label"
                item-value="property"
                :readonly="isEdit"
              />
            </v-col>
            <v-col sm="4">
              <v-select
                v-if="mappings"
                v-model="model.mapping"
                :readonly="isEdit"
                :items="mappings"
                item-text="operator"
                item-value="operator"
                return-object
              />
            </v-col>
            <v-col v-if="model.mapping" sm="4">
              <v-select
                v-if="model.mapping.operator === existsLabel || model.mapping.type === Boolean"
                v-model="model.value"
                :items="[
                  {value: false, text: 'false'},
                  {value: true, text: 'true'},
                ]"
              />
              <select-date-menu
                v-else-if="model.mapping.type === Date"
                :date.sync="model.value"
              />
              <select-sus-autocomplete
                v-else-if="model.mapping.type === 'stratigraphicUnit'"
                :label="model.mapping.label"
                :select.sync="model.value"
              />
              <select-graves-autocomplete
                v-else-if="model.mapping.type === 'grave'"
                :label="model.mapping.label"
                :select.sync="model.value"
              />
              <filter-vocabulary-select
                v-else-if="model.mapping.vocabulary"
                :vocabulary-name="model.mapping.vocabulary"
                :label="model.mapping.label"
                :select.sync = model.value
              />
              <v-text-field
                v-else
                v-model="model.value"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {clone} from "ramda";
import {ExistsLabels} from "@/src/hydra";
import FilterVocabularySelect from "@/components/filters/FilterVocabularySelect";

const defaultModel = () => {return {
    property: '',
    mapping: null,
    value: null
  }
}

export default {
  name: "FilterCollectionEditDialog",
  components: {FilterVocabularySelect},
  props: {
    applicableFilters: {
      type: Array,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    filter: {
      type: Object,
      default: null
    },
    filters: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      model: defaultModel()
    }
  },
  computed: {
    existsLabel() {
      return ExistsLabels.exists
    },
    isValid() {
      return !!this.model.property && this.model.mapping && this.model.value !== null
    },
    isEdit() {
      return !!this.filter
    },
    properties() {
      return this.applicableFilters.filter(
        // filters out non-multiple filters which are already set
        filter => filter.multiple || !this.filters.some(
          _filter => _filter.mapping.variable === filter.variable
        ))
    },
    mappings() {
      const property = this.model.property
      return property
        ? this.applicableFilters.filter(filter => filter.property === property)
        : null
    }
  },
  watch: {
    property() {
      this.model.operator = ''
    },
    mapping() {
      this.model.value = ''
    },
    filter: {
      handler(value) {
        if (value) this.model = clone(value)
      },
      immediate: true
    }
  },
  methods: {
    add() {
      this.$emit(this.isEdit ? 'update:filter' : 'add', this.model)
      this.close()
    },
    close() {
      this.$emit('update:visible', false)
      this.model = defaultModel()
    },
  }
}
</script>
