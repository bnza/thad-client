<template>
  <v-card data-cy="action-resource-card">
    <v-toolbar flat dense>
      <navigation-prev-button />
      <v-toolbar-title data-cy="resource-action-toolbar-title">
        <span class="text-capitalize">{{resource.itemLabel}}</span>
        <small>({{action}})</small>
      </v-toolbar-title>
    </v-toolbar>
    <slot />
    <slot name="actions">
      <v-card-actions>
        <v-container>
          <v-row justify="center">
            <v-col>
              <v-btn
                color="primary"
                text
                data-cy="submit-btn"
                :disabled="loading"
                @click="submit"
              >
                Submit
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                text
                data-cy="cancel-btn"
                @click="cancel"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </slot>
  </v-card>
</template>

<script>
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
import {getResourceProperty} from "@/src/utils";

export default {
  name: "ActionResourceCard",
  mixins: [
    ResourceNavigationMixin
  ],
  props: {
    action: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getResourceProperty,
    submit() {
      this.$slots.default[0].componentInstance.submit()
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
