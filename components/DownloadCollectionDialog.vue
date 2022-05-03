<template>
  <v-dialog
    :value="visible"
    width="600px"
    persistent
  >
    <v-card>
      <v-toolbar flat dense>
        <v-toolbar-title>Download {{ resourceTitle }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="mt-6">
        <v-container class="d-flex justify-center align-center">
          <v-row>
            <v-col>
              <p v-if="totalItems">Are you sure you want to download <strong class="secondary--text">{{totalItems}}</strong> items?</p>
              <p v-else>No items</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-progress-circular v-if="downloading" indeterminate/>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col class="md2">
              <v-btn
                :disabled="downloading"
                class="primary--text"
                text
                data-cy="download-btn"
                @click="$emit('download')"
              >
                Download
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
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DownloadCollectionDialog",
  props: {
    resourceName: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    totalItems: {
      type: Number,
      default: 0
    },
    downloading: {
      type: Boolean,
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
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    }
  },

}
</script>

<style scoped>

</style>
