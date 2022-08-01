<template>
  <v-card data-cy="item-cumulative-pottery-card">
    <v-toolbar flat height="0">
      <template v-if="ready" #extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tab href="#ware">Ware</v-tab>
          <v-tab href="#periods">Periods</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-card-text v-if="ready" class="no-gutters">
      <v-row v-if="$auth.hasScope('ROLE_EDITOR')">
        <v-spacer />
          <div class="d-flex justify-end mb-2" >
            <navigation-update-resource-button :item-id="item.id" resource-name="cumulativePotterySheet" :disabled="false" />
            <navigation-delete-resource-button
              :item-id="item.id"
              resource-name="cumulativePotterySheet"
              :disabled="false"
              @delete="openDeleteDialog(item)"
            />
          </div>
      </v-row>
      <v-tabs-items v-model="tab">
        <v-tab-item value="ware">
          <lazy-read-cumulative-pottery-sheet-ware-card :item="item" />
        </v-tab-item>
        <v-tab-item value="periods">
          <lazy-read-cumulative-pottery-sheet-period-card :item="item" />
        </v-tab-item>
      </v-tabs-items>
      <read-cumulative-pottery-sheet-common-card v-if="ready" class="px-6" :item="item"/>
    </v-card-text>
    <v-card-text v-else>
      <v-container>
        <v-row>
          <v-col />
          <v-col class="my-16">
            <div class="d-flex justify-center" >
              <p>No cumulative pottery sheet associated</p>
            </div>
            <div class="d-flex justify-center" >
              <navigation-create-resource-button
                v-if="$auth.hasScope('ROLE_EDITOR')"
                :parent="parent"
                resource-name="cumulativePotterySheet"
                :disabled="false"
              />
            </div>
          </v-col>
          <v-col />
        </v-row>
      </v-container>
    </v-card-text>
    <delete-resource-dialog
      v-if="deletingItem"
      resource-name="cumulativePotterySheet"
      :visible.sync="deleteDialog"
      :item="deletingItem"
      @itemDeleted="fetchParent()"
    >
      <delete-cumulative-pottery-sheet-card-text :item="deletingItem" />
    </delete-resource-dialog>
  </v-card>
</template>

<script>
import {isEmpty} from "ramda";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
import ResourceDeleteDialogMixin from "@/mixins/ResourceDeleteDialogMixin";

export default {
  name: "ReadCumulativePotterySheetCard",
  mixins: [
    ResourceItemDataAccessorMixin,
    ResourceDeleteDialogMixin
  ],
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    parent: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      panels: [
        0
      ],
      tab: 'ware'
    }
  },
  computed: {
    ready() {
      return !isEmpty(this.item);
    },
  },
  methods: {
    fetchParent() {
      this.deleteDialog = false
      this.deletingItem = null
      this.$emit('deleted')
    },
  }
}
</script>
