<template>
  <v-dialog
    data-cy="create-su-rel-dialog"
    :value="visible"
    width="500"
    persistent
  >
    <v-card data-cy="create-su-rel-card">
      <v-card-title class="text-overline mb-4 secondary--text" >
        Add relationship
      </v-card-title>
      <v-card-text>
        <v-text-field
          :value="formatCode('stratigraphicUnit', sxSu)"
          label="stratigraphic unit"
          readonly
        />
        <v-text-field
          :value="getResponseValue('value', relationship)"
          label="relationship"
          readonly
        />
        <select-sus-autocomplete
          data-cy="dx-su-input"
          :select.sync="modelItem.dxSu"
          :area="sxSu.area"
          v-on="$listeners"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          data-cy="submit-btn"
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
import {mapActions} from "vuex";
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
import SelectSusAutocomplete from "@/components/SelectSusAutocomplete";

export default {
  name: "CreateSuRelDialog",
  components: {
    SelectSusAutocomplete
  },
  mixins: [
    ResourceItemDataAccessorMixin,
    ResourceNavigationMixin
  ],
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    sxSu: {
      type: Object,
      required: true
    },
    relationship: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      modelItem: {
        dxSu: {}
      }
    }
  },
  computed: {
    requestData() {
      return {
        sxSU: this.sxSu['@id'],
        relationship: this.relationship['@id'],
        dxSU: this.modelItem.dxSu['@id']
      }
    }
  },
  methods: {
    ...mapActions('http', [
      'request',
    ]),
    async submit() {
      try {
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
      this.modelItem.dxSu = {}
      this.$emit('update:visible', false)
    }
  }
}
</script>
