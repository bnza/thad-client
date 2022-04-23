<template>
    <v-card-text>
        <v-container>
          <v-row dense>
            <v-col data-cy="site-code-input-col">
              <v-text-field
                v-model="modelItem.code"
                label="code"
                required
                :error-messages="codeErrors"
                @input="$v.modelItem.code.$touch()"
                @blur="$v.modelItem.code.$touch()"
              />
            </v-col>
            <v-col data-cy="site-name-input-col">
              <v-text-field
                v-model="modelItem.name"
                label="name"
                required
                :error-messages="nameErrors"
                @input="$v.modelItem.name.$touch()"
                @blur="$v.modelItem.name.$touch()"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-text-field
                v-model="modelItem.description"
                label="description"
                data-cy="site-description-input"
              />
            </v-col>
          </v-row>
        </v-container>
    </v-card-text>
</template>

<script>
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
import ResourceValidationSiteMixin from "@/mixins/validation/ResourceValidationSiteMixin";
import ResourceItemEditMixin from "@/mixins/ResourceItemEditMixin";

export default {
  name: "EditSiteCard",
  mixins: [
    ResourceNavigationMixin,
    ResourceValidationSiteMixin,
    ResourceItemEditMixin
  ]
}
</script>

<style scoped>

</style>
