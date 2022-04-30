<template>
  <v-dialog
    :value="visible"
    width="600px"
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
        <v-list v-if="modelFilters.length" dense>
          <v-list-item
            v-for="(filter, i) in modelFilters"
            :key="i"
          >
            <v-list-item-icon class="mb-4">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    data-cy="filter-delete-btn"
                    small
                    v-on="on"
                    @click="removeFilter(i)"
                  >
                    <v-icon x-small color="error">mdi-close</v-icon>
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
                      small
                      v-on="on"
                      @click="editFilter(i)"
                    >
                      <v-icon x-small color="primary">mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span>Edit</span>
              </v-tooltip>
            </v-list-item-icon>
            <v-list-item-content>
              <p class="mb-1">
                <span class="secondary--text mr-2"> {{filter.property }} </span>
                <span class="grey--text">{{filter.mapping.operator}} </span>
                <code class="ml-2">{{filter.value}}</code>
              </p>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-text v-else class="primary--text">
          No filter selected
        </v-card-text>
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
      <filter-collection-add-dialog
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
import {parseHydraSearchMapping, appFiltersToQueryStringObject} from "@/src/hydra/filters";
import FilterCollectionAddDialog from "@/components/FilterCollectionAddDialog";

export default {
  name: "FilterCollectionDialog",
  components: {
    FilterCollectionAddDialog
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
    }
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
    parsedHydraSearchMapping() {
      return parseHydraSearchMapping(this.hydraSearch)
    },
    applicableFilters() {
      return this.parsedHydraSearchMapping
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
    },
    normalizedFilters() {
      return appFiltersToQueryStringObject(this.modelFilters)
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
    addDialog(flag) {
      if (!flag) {
        this.currentFilterIndex = -1
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    clear() {
      this.modelFilters = []
    },
    apply() {
      this.$emit('update:filters', this.modelFilters)
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
    }
  },

}
</script>

<style scoped>

</style>
