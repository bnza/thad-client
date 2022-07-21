<template>
  <v-container data-cy="collection-su-st-rel-container">
    <v-row dense class="text-right">
      <v-spacer />
      <v-col>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              data-cy="su-st-enable-editing-btn"
              :disabled="!$auth.hasScope('ROLE_EDITOR')"
              color="primary"
              v-bind="attrs"
              icon
              x-small
              v-on="on"
              @click="isEditingEnabled = !isEditingEnabled"
            >
              <v-icon>
                {{editingButtonIcon}}
              </v-icon>
            </v-btn>
          </template>
          <span>{{editingButtonTooltip}}</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row dense>
      <lazy-collection-document-building-room-card
        :parent="item"
        parent-request-filter-key="mediaObject.id"
        :enabled="isEditingEnabled"
        resource-name="mediaObjectBuildingRoom"
      />
    </v-row>
    <v-row dense>
      <lazy-collection-document-sus-card
        :parent="item"
        parent-request-filter-key="mediaObject.id"
        :enabled="isEditingEnabled"
        resource-name="mediaObjectStratigraphicUnit"
      />
    </v-row>
    <v-row dense>
      <lazy-collection-document-graves-card
        :parent="item"
        parent-request-filter-key="mediaObject.id"
        :enabled="isEditingEnabled"
        resource-name="mediaObjectGrave"
      />
    </v-row>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
import EditableResourceCollectionMixin from "@/mixins/EditableResourceCollectionMixin";
export default {
  name: "CollectionDocumentRelatedItemsContainer",
  mixins: [
    EditableResourceCollectionMixin,
    ResourceNavigationMixin
  ],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      panels: [0,1,2,3],
      modelItem: {}
    }
  },
  methods: {
    ...mapActions('http', [
      'request',
    ]),
    async submit(data, close) {
      try {
        const response = await this.request({
          method: 'patch',
          url: this.resource.itemUrl(this.item.id),
          data,
          headers: {
            Accept: 'application/ld+json',
            'Content-Type': 'application/merge-patch+json'
          }
        })
        this.$emit('updated', response)
        if (close) {
          close()
        }
      } catch (e) {
        await this.$store.dispatch('snackbar/requestError', e)
      }
    },
  }
}
</script>
