<template>
  <v-dialog
    fullscreen
    :value="visible"
    persistent
  >
    <v-card>
      <v-toolbar flat dense>
        <v-toolbar-title>Filter {{ resourceTitle }}</v-toolbar-title>
        <v-spacer />
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              data-cy="filter-add-btn"
              v-on="on"
              @click.stop="addFilter"
            >
              <v-icon class="mx-3">mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Add</span>
        </v-tooltip>
      </v-toolbar>
      <v-card-text>
        <v-container v-if="modelFilters.length">
          <v-row
            v-for="(filter, i) in modelFilters"
            :key="i"
            dense
            align="center"
          >
            <v-col sm="1">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    data-cy="filter-delete-btn"
                    v-on="on"
                    @click="removeFilter(i)"
                  >
                    <v-icon color="error">mdi-close</v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    data-cy="filter-delete-btn"
                    v-on="on"
                    @click="editFilter(i)"
                  >
                    <v-icon color="primary">mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>
            </v-col>
            <v-spacer />
            <v-col sm="4">
              <span class="secondary--text"> {{filter.mapping.label }} </span>
            </v-col>
            <v-col sm="2">
              <span>{{filter.mapping.operator}}</span>
            </v-col>
            <v-col sm="5">
              <code>{{readableValue(filter.mapping, filter.value)}}</code>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-else class="primary--text">
          <v-row class="my-16">
            <v-spacer/>
            <v-col class="text-center">
              No filter selected
            </v-col>
            <v-spacer/>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col class="md2">
              <v-btn
                class="primary--text"
                text
                data-cy="apply-btn"
                @click="apply"
              >
                Apply
              </v-btn>
            </v-col>
            <v-col class="md2">
              <v-btn
                text
                data-cy="apply-btn"
                @click="clear"
              >
                Clear
              </v-btn>
            </v-col>
            <v-spacer />
            <v-col class="md2">
              <v-btn
                text
                data-cy="cancel-btn"
                @click.stop="close"
              >
                Close
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
      <filter-collection-edit-dialog
        :visible.sync="addDialog"
        :applicable-filters="applicableFilters"
        :filter.sync="currentFilter"
        :filters="modelFilters"
        @add="modelFilters.push($event)"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";
import {clone} from "ramda"
import {getApplicableFilters} from "@/src/hydra/filters";
import FilterCollectionEditDialog from "@/components/filters/FilterCollectionEditDialog";

export default {
  name: "FilterCollectionDialog",
  components: {
    FilterCollectionEditDialog
  },
  props: {
    resourceName: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    hydraSearch: {
      type: Object,
      required: true,
    },
    filters: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      modelFilters: [],
      addDialog: false,
      currentFilterIndex: -1
    }
  },
  computed: {
    resourceTitle() {
      return this.resourceName
    },
    applicableFilters() {
      return getApplicableFilters(this.resourceName).sort(
        (a, b) => a.label > b.label
      )
    },
    currentFilter: {
      get() {
        return this.modelFilters[this.currentFilterIndex] || null
      },
      set(filter) {
       if (this.currentFilterIndex !== -1) {
         Vue.set(this.modelFilters, this.currentFilterIndex, filter)
       }
      }
    }
  },
  watch: {
    filters: {
      handler(value) {
        this.modelFilters = clone(value)
      },
      immediate: true,
      deep: true
    },
    modelFilters: {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.filtersApplied = false
        }
      },
      deep: true
    },
    addDialog(flag) {
      if (!flag) {
        this.currentFilterIndex = -1
      }
    }
  },
  methods: {
    update() {
      this.$emit('update:filters', this.modelFilters)
    },
    close() {
      this.$emit('update:visible', false)
    },
    clear() {
      this.modelFilters = []
      this.update()
    },
    apply() {
      this.update()
      this.close()
    },
    removeFilter(i) {
      this.modelFilters.splice(i, 1)
    },
    editFilter(i) {
      this.currentFilterIndex = i
      this.addDialog = true
    },
    addFilter() {
      this.currentFilterIndex = -1
      this.addDialog = true
    },
    readableValue(mapping, value, valueField) {
      if (Array.isArray(value)) {
        valueField = valueField || 'value'
        return value.map(vocEntry => vocEntry[valueField]).join(',')
      }
      if (
        ['stratigraphicUnit'].includes(mapping.type)
      ) {
        return value['@code']
      }
      return value;
    }
  },
}
</script>

<style scoped>

</style>
