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
              />
            </v-col>
          </v-row>
        </v-container>
    </v-card-text>
</template>

<script>
import ResourceFetchMixin from "@/mixins/ResourceFetchMixin";
import SiteResourceValidationMixin from "@/mixins/validation/SiteResourceValidationMixin";

export default {
  name: "CreateSiteCard",
  mixins: [
    ResourceFetchMixin,
    SiteResourceValidationMixin
  ],
  data() {
    return {
      item: {}
    }
  },
  computed: {
    resourceName() {
      return 'sites'
    },
    url() {
      return '/sites'
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
