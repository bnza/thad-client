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
                @change="change('code', $event)"
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
                @change="change('name', $event)"
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
                @change="change('description', $event)"
              />
            </v-col>
          </v-row>
        </v-container>
    </v-card-text>
</template>

<script>
import ResourceItemFormMixin from "@/mixins/ResourceItemFormMixin";
import ResourceValidationSiteMixin from "@/mixins/validation/ResourceValidationSiteMixin";
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";

export default {
  name: "UpdateSiteCard",
  mixins: [
    ResourceItemFormMixin,
    ResourceNavigationMixin,
    ResourceValidationSiteMixin
  ],
  data() {
    return {
      editableItem: {},
      form: {}
    }
  },
  computed: {
    code() {
      return this.getResponseValue('code')
    },
    readPath() {
      return this.$route.fullPath.replace(/\/edit$/, '')
    }
  },
  watch: {
    responseData(item) {
      this.editableItem = item
    }
  },
  methods: {
    change(key, value) {
      this.form[key] = value
    },
    async submit() {
      if (this.$v.$invalid) {
        return
      }
      try {
        this.response = await this.request({
          method: 'patch',
          url: this.getItemResourceUrl(this.id),
          data: this.editableItem,
          headers: {
            Accept: 'application/ld+json',
            'Content-Type': 'application/merge-patch+json'
          }
        })
        await this.$router.go(-1)
      } catch (e) {
        await this.$store.dispatch('snackbar/requestError', e)
      }
    }
  }
}
</script>

<style scoped>

</style>
