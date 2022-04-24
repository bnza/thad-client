<template>
    <v-card-text>
        <v-container>
          <v-row dense>
            <v-col data-cy="site-select-col">
              <select-sites-autocomplete
                :readonly="!$auth.hasScope('ROLE_ADMIN')"
                :select.sync="modelItem.site"
                :error-messages="siteErrors"
                class="mx-4"
                v-on="$listeners"
                @input="$v.modelItem.site.$touch()"
                @blur="$v.modelItem.site.$touch()"
              />
            </v-col>
            <v-text-field
              data-cy="site-name-input"
              :value="getResponseValue('site.name', modelItem)"
              label="site name"
              readonly
              class="mx-4"
            />
          </v-row>
          <v-row dense>
            <v-col data-cy="area-code-input-col">
              <v-text-field
                v-model="modelItem.code"
                label="code"
                required
                :error-messages="codeErrors"
                class="mx-4"
                @input="$v.modelItem.code.$touch()"
                @blur="$v.modelItem.code.$touch()"
              />
            </v-col>
            <v-col data-cy="area-name-input-col">
              <v-text-field
                v-model="modelItem.name"
                label="name"
                required
                :error-messages="nameErrors"
                class="mx-4"
                @input="$v.modelItem.name.$touch()"
                @blur="$v.modelItem.name.$touch()"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-textarea
                v-model="modelItem.description"
                label="description"
                class="mx-4"
                data-cy="area-description-input"
              />
            </v-col>
          </v-row>
        </v-container>
    </v-card-text>
</template>

<script>
import {has} from "ramda";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
import ResourceValidationAreaMixin from "@/mixins/validation/ResourceValidationAreaMixin";
import ResourceItemEditMixin from "@/mixins/ResourceItemEditMixin";
import SelectSitesAutocomplete from "@/components/SelectSitesAutocomplete";
import {normalizeRequestBodyData} from "@/src/request";

export default {
  name: "EditSiteCard",
  components: {
    SelectSitesAutocomplete
  },
  mixins: [
    ResourceItemDataAccessorMixin,
    ResourceNavigationMixin,
    ResourceValidationAreaMixin,
    ResourceItemEditMixin
  ],
  data() {
    return {
      modelItem: {
        site: {}
      },
    }
  },
  computed: {
    requestData() {
      const data = normalizeRequestBodyData(this.updateItem)
      if (has('site', data)) {
        data.site = data.site['@id']
      }
      return data
    }
  }
}
</script>

<style scoped>

</style>
