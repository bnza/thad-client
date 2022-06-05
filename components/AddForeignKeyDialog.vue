<template>
  <v-dialog
    :value="visible"
    width="500"
    persistent
  >
    <v-card data-cy="add-foreign-key-dialog-card">
      <v-card-title class="primary--text">
        Link
      </v-card-title>
      <v-card-text>
        <span class="text-overline secondary--text">{{parentResource.itemLabel}}</span><br />
      </v-card-text>
      <slot />
      <v-card-text>
        Please select the <span class="text-overline secondary--text">{{resource.itemLabel}}</span> which will be linked<br />
        <select-sus-autocomplete
          label="stratigraphic unit"
          :select.sync="target"
          :clearable="true"
          :error-messages="targetErrors"
          @input="$v.target.$touch()"
          @blur="$v.target.$touch()"
        />
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-btn
          color="primary"
          text
          data-cy="link-btn"
          @click="linkItem"
        >
          Link
        </v-btn>
        <v-spacer></v-spacer>
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
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
import SetStratigraphicUnitGraveForeignKeyMixin from "@/mixins/validation/SetStratigraphicUnitGraveForeignKeyMixin";
import {normalizeResourceId} from "@/src/request";

export default {
  name: "AddForeignKeyDialog",
  mixins: [
    ResourceNavigationMixin,
    SetStratigraphicUnitGraveForeignKeyMixin
  ],
  data() {
    return {
      target: null,
    }
  },
  props: {
    idKey: {
      type: String,
      default: 'id'
    },
    item: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    parentResourceName: {
      type: String,
      required: true
    },
    resourceField: {
      type: String,
      required: true
    }
  },
  computed: {
    id() {
      return this.item[this.idKey]
    },
    url() {
      return this.getItemResourcePath(this.id)
    },
    parentResource() {
      return this.$store.getters['api/getResource'](this.parentResourceName)
    },
    requestData() {
      const _data = {...this.item}
      return {
        [this.resourceField]: normalizeResourceId(_data)
      }
    },
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
      this.$emit('close', false)
    },
    async linkItem() {
      // this.$v.touch()
      // if (this.$v.$invalid()) {
      //   return
      // }
      try {
        await this.$store.dispatch('http/request', {
          method: 'patch',
          url: this.getItemResourceUrl(this.target.id),
          data: this.requestData,
          headers: {
            Accept: 'application/ld+json',
            'Content-Type':'application/merge-patch+json'
          }
        })
        await this.$store.dispatch('snackbar/show', {
          text: 'Successfully unlinked item',
          color: 'success'
        })
        this.$emit('linked')
      } catch (e) {
        await this.$store.dispatch('snackbar/requestError', e)
      } finally {
        this.close()
      }
    }
  }
}
</script>

<style scoped>

</style>
