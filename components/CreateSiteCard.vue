<template>
    <v-card-text>
        <v-container>
          <v-row dense>
            <v-col data-cy="site-code-input-col">
              <v-text-field
                v-model="editableItem.code"
                label="code"
                required
                :error-messages="codeErrors"
                @input="$v.editableItem.code.$touch()"
                @blur="$v.editableItem.code.$touch()"
              />
            </v-col>
            <v-col data-cy="site-name-input-col">
              <v-text-field
                v-model="editableItem.name"
                label="name"
                required
                :error-messages="nameErrors"
                @input="$v.editableItem.name.$touch()"
                @blur="$v.editableItem.name.$touch()"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-text-field
                v-model="editableItem.description"
                label="description"
                data-cy="site-description-input"
              />
            </v-col>
          </v-row>
        </v-container>
    </v-card-text>
</template>

<script>
import ResourceFetchMixin from "@/mixins/ResourceFetchMixin";
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
import ResourceValidationSiteMixin from "@/mixins/validation/ResourceValidationSiteMixin";

export default {
  name: "CreateSiteCard",
  mixins: [
    ResourceFetchMixin,
    ResourceNavigationMixin,
    ResourceValidationSiteMixin
  ],
  data() {
    return {
      editableItem: {}
    }
  },
  methods: {
    newResourcePath(data) {
      return this.$route.fullPath.replace(/create$/, data.id)
    },
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        const response = await this.request({
          method: 'post',
          url: this.resourceBaseUrl,
          data: this.editableItem,
          headers: {
            Accept: 'application/ld+json'
          }
        })
        await this.$router.replace(this.newResourcePath(response.data))
      } catch (e) {
        await this.$store.dispatch('snackbar/requestError', e)
      }
    }
  }
}
</script>

<style scoped>

</style>
