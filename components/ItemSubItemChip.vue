<template>
  <v-menu
    v-model="menuVisible"
    offset-x
    rounded
    right
  >
    <template #activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-chip
            data-cy="item-rel-chip"
            :close="enabled && $auth.hasScope('ROLE_EDITOR')"
            label
            v-bind="attrs"
            @click:close="$emit('delete', item)"
            v-on="{ ...tooltip, ...menu }"
          >
            {{code}}
          </v-chip>
        </template>
        <span>Show more</span>
      </v-tooltip>
    </template>
    <v-card data-cy="sub-item-read">
      <v-card-title v-if="subItem.id" class="text-overline secondary--text">
        {{formatCode(resourceName, subItem)}}
        <v-spacer />
        <NavigationResourceReadButton :item-id="subItem.id" :resource-name="resourceName" />
      </v-card-title>
      <v-card-text >
        <v-progress-circular v-if="loading" indeterminate/>
        <template v-else-if="subItem.id">
          <v-container style="padding-top: 0; margin-top: 0">
            <v-row dense>
              <v-col md="4" class="text-right text-caption font-weight-bold " style="padding-top: 0; margin-top: 0">
                area:
              </v-col>
              <v-col class="text-caption" style="padding-top: 0; margin-top: 0">
                {{ getResponseValue('area.code', subItem) }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col md="4" class="text-right text-caption md2 font-weight-bold" style="padding-top: 0; margin-top: 0">
                type:
              </v-col>
              <v-col class="text-caption" style="padding-top: 0; margin-top: 0">
                {{ getResponseValue('type.value', subItem) }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col md="4" class="text-right text-caption md2 font-weight-bold" style="padding-top: 0; margin-top: 0">
                description:
              </v-col>
              <v-col class="text-caption" style="padding-top: 0; margin-top: 0">
                {{ getResponseValue('description', subItem) }}
              </v-col>
            </v-row>
          </v-container>
        </template>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";

export default {
  name: "ItemSubItemChip",
  mixins: [
    ResourceItemDataAccessorMixin
  ],
  props: {
    enabled: {
      type: Boolean,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    idItemPath: {
      type: String,
      required: true
    },
    resourceName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      menuVisible: false,
      subItem: {},
      loading: true
    }
  },
  async fetch() {
    if (this.idItemPath && this.menuVisible) {
      const response = await this.$store.dispatch('http/getResourceItem', {id: this.itemId, resourceName: this.resourceName })
      this.subItem = response.data
      this.loading = false
    }
  },
  computed: {
    itemId() {
      return this.item ? this.getResponseValue(`${this.idItemPath}.id`, this.item) : undefined
    },
    code() {
      return this.item ? this.getResponseValue(`${this.idItemPath}.number`, this.item) : undefined
    }
  },
  watch: {
    menuVisible(flag) {
      if (flag) {
        this.$fetch()
      }
    }
  }
}
</script>
