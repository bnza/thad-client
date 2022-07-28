<template>
  <v-dialog
    :value="visible"
    width="500px"
    persistent
  >
    <v-card>
      <v-card-title>
        Add media
      </v-card-title>
      <edit-media-object-card-text ref="media" resource-name="mediaObject"/>
      <v-card-actions>
        <v-btn
          color="primary"
          text
          data-cy="add-btn"
          @click="submit"
        >
          Submit
        </v-btn>
        <v-spacer />
        <v-btn
          text
          data-cy="cancel-btn"
          @click="close"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {has} from "ramda";
import ResourceFetchMixin from "@/mixins/ResourceFetchMixin";
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
import ResourceItemEditMixin from "@/mixins/ResourceItemEditMixin";

export default {
  name: "EditJoinMediaObjectDialog",
  mixins: [
    ResourceFetchMixin,
    ResourceNavigationMixin,
    ResourceItemEditMixin
  ],
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    parent: {
      type: Object,
      required: true,
      validator (value) {
        return typeof value === 'object' && !!value.id
      }
    },
    parentRequestKey: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      modelItem: {
        mediaObject: null
      },
    }
  },
  computed: {
    id() {
      return null
    },
    requestData() {
      const model = {}
      for (const key of [
        'grave',
        'sample',
        'ecofact',
        'smallFind',
        'pottery',
        'stratigraphicUnit',
        'mediaObject',
      ]){
        if (has(key, this.modelItem)) {
          model[key] = this.normalizeResource(key)
        }
      }
      return model
    }
  },
  watch: {
    parent: {
      handler(value) {
        this.modelItem[this.parentRequestKey] = value
      },
      immediate: true
    }
  },
  methods: {
    async submit() {
        try {
          this.modelItem.mediaObject = await this.$refs.media.submit()
          if (!this.modelItem.mediaObject) {
            return
          }
          await this.request({
            method: 'post',
            url: this.resource.collectionUrl,
            data: this.requestData,
            headers: {
              Accept: 'application/ld+json'
            }
          })
          this.close()
          this.$emit('created')
        } catch (e) {
        await this.$store.dispatch('snackbar/requestError', e)
      }
    },
    close() {
      this.$emit('update:visible', false)
    },
  }
}
</script>
