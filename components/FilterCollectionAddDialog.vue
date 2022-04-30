<template>
  <v-dialog
    :value="visible"
    width="500px"
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
            <v-col sm="5">
              <v-select
                v-model="model.property"
                :items="properties"
                item-text="property"
                item-value="property"
                :readonly="isEdit"
              />
            </v-col>
            <v-col sm="3">
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
            <v-col sm="4">
              <v-text-field
                v-if="model.mapping"
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

const defaultModel = () => {return {
    property: '',
    mapping: null,
    value: ''
  }
}

export default {
  name: "FilterCollectionAddDialog",
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
    isValid() {
      return !!this.model.property && this.model.mapping && this.model.value
    },
    isEdit() {
      return !!this.filter
    },
    properties() {
      const _filters = this.filters
      const filters =  this.applicableFilters.filter(
        /* unique */(f,i,self) => self.indexOf(f) === i
      )
      if (!this.isEdit) {
        filters.filter(
          /* remove already set non-multiple choice filters */
          f => f.multiple || !_filters.some(_f => f.variable === _f.mapping.variable)
        )
      }
      return filters
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
    }
  }
}
</script>
