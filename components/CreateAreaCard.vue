<template>
    <v-card-text>
        <v-container>
          <v-row dense>
            <v-col>
              <select-sites-autocomplete
                :error-messages="siteErrors"
                class="mx-4"
                v-on="$listeners"
                @select="setSite"
                @input="$v.item.site.$touch()"
                @blur="$v.item.site.$touch()"
              />
            </v-col>
            <v-text-field
              :value="siteName"
              label="site name"
              readonly
              class="mx-4"
            />
          </v-row>
          <v-row dense>
            <v-col>
              <v-text-field
                v-model="item.code"
                label="code"
                required
                :error-messages="codeErrors"
                class="mx-4"
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
                class="mx-4"
                @input="$v.item.name.$touch()"
                @blur="$v.item.name.$touch()"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-textarea
                v-model="item.description"
                label="description"
                class="mx-4"
              />
            </v-col>
          </v-row>
        </v-container>
    </v-card-text>
</template>

<script>
import SelectSitesAutocomplete from "@/components/SelectSitesAutocomplete";
import ResourceFetchMixin from "@/mixins/ResourceFetchMixin";
import ResourceValidationAreaMixin from "@/mixins/validation/ResourceValidationAreaMixin";

export default {
  name: "CreateSiteCard",
  components: {
    SelectSitesAutocomplete
  },
  mixins: [
    ResourceFetchMixin,
    ResourceValidationAreaMixin
  ],
  data() {
    return {
      item: {},
      siteName: null,
    }
  },
  computed: {
    url() {
      return '/areas'
    }
  },
  watch: {
    item: {
      handler(item) {
        if (item.code) {
          this.item.code = item.code.trim().toUpperCase()
        }
        if (item.name) {
          this.item.name = item.name.trim()
        }
      },
      deep: true
    }
  },
  methods: {
    newResourcePath(data) {
      return this.$route.fullPath.replace(/create$/, data.id)
    },
    setSite(site) {
      if (!site) {
        this.item.site = null
        this.siteName = null
        return
      }
      this.item.site = `${this.$config.apiPrefix}/sites/${site.id}`
      this.siteName = site.name
    },
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        const response = await this.request({
          method: 'post',
          url: this.url,
          data: this.item,
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
