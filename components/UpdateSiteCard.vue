<template>
    <v-card-text>
        <v-container>
          <v-row dense>
            <v-col>
              <v-text-field
                v-model="item.code"
                label="code"
                required
                :error-messages="codeErrors"
                @change="change('code', $event)"
                @input="$v.item.code.$touch()"
                @blur="$v.item.code.$touch()"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="item.name"
                label="name"
                required
                :error-messages="nameErrors"
                @change="change('name', $event)"
                @input="$v.item.name.$touch()"
                @blur="$v.item.name.$touch()"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-text-field
                v-model="item.description"
                label="description"
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

export default {
  name: "UpdateSiteCard",
  mixins: [
    ResourceItemFormMixin,
    ResourceValidationSiteMixin
  ],
  data() {
    return {
      item: {},
      form: {}
    }
  },
  computed: {
    resourceName() {
      return 'sites'
    },
    code() {
      return this.getResponseValue('code')
    },
    readPath() {
      return this.$route.fullPath.replace(/\/edit$/, '')
    }
  },
  watch: {
    responseData(item) {
      this.item = item
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
      this.response = await this.request({
        method: 'patch',
        url: this.url,
        data: this.form,
        headers: {
          Accept: 'application/ld+json',
          'Content-Type': 'application/merge-patch+json'
        }
      })
      await this.$router.replace(this.readPath)
    }
  }
}
</script>

<style scoped>

</style>
