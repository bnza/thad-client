<template>
    <v-card-text data-cy="file-input-card">
      <v-file-input
        v-model="modelItem.file"
        accept="image/jpeg, application/pdf"
        label="Upload file"
        data-cy="file-input"
        :error-messages="fileErrors"
        @change="$v.modelItem.file.$touch()"
      />
    </v-card-text>
</template>

<script>
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
import ResourceFetchMixin from "@/mixins/ResourceFetchMixin";
import ResourceValidationMediaObjectMixin from "@/mixins/validation/ResourceValidationMediaObjectMixin";

export default {
  name: "EditMediaObjectCardText",
  mixins: [
    ResourceNavigationMixin,
    ResourceFetchMixin,
    ResourceValidationMediaObjectMixin
  ],
  data() {
    return {
      modelItem: {
        file: null
      },
    }
  },
  methods: {
    async findByHash(sha256) {
      const response = await this.request({
        method: 'get',
        url: this.resource.collectionUrl,
        params: {
          sha256
        },
        headers: {
          Accept: 'application/ld+json'
        }
      })
      return response.data['hydra:member'][0]
    },
    async isInvalid() {
      await this.$v.$touch()
      return this.$v.$invalid
    },
    async submit() {
      await this.isInvalid()
      const data = new FormData()
      data.append('file', this.modelItem.file)
      try {
         this.response = await this.request({
          method: 'post',
          url: this.resource.collectionUrl,
          data,
          headers: {
            Accept: 'application/ld+json'
          }
        })
        this.modelItem.file = null
        return this.responseData
      } catch (e) {
        if (!e.request || !e.request.response) {
          throw e
        }
        const response = JSON.parse(e.request.response)
        if (
          e.request.status === 422
          && response['@type'] === 'ConstraintViolationList'
        ) {
          const sha256 = response['hydra:description'].match(/"(\w+)"$/)[1]
          return await this.findByHash(sha256)
        } else {
          throw e
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
