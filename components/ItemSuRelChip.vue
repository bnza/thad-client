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
            :close="$auth.hasScope('ROLE_EDITOR')"
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
    <v-card>
      <v-card-title v-if="su.id" class="text-overline secondary--text">
        {{formatCode('stratigraphic_units', su)}}
        <v-spacer />
        <NavigationResourceReadButton :item-id="su.id" resource-name="stratigraphic_units" />
      </v-card-title>
      <v-card-text >
        <v-progress-circular v-if="loading" indeterminate/>
        <template v-else-if="su.id">
          <v-container style="padding-top: 0; margin-top: 0">
            <v-row dense>
              <v-col md="4" class="text-right text-caption font-weight-bold " style="padding-top: 0; margin-top: 0">
                area:
              </v-col>
              <v-col class="text-caption" style="padding-top: 0; margin-top: 0">
                {{ getResponseValue('area.code', su) }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col md="4" class="text-right text-caption md2 font-weight-bold" style="padding-top: 0; margin-top: 0">
                type:
              </v-col>
              <v-col class="text-caption" style="padding-top: 0; margin-top: 0">
                {{ getResponseValue('type.value', su) }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col md="4" class="text-right text-caption md2 font-weight-bold" style="padding-top: 0; margin-top: 0">
                description:
              </v-col>
              <v-col class="text-caption" style="padding-top: 0; margin-top: 0">
                {{ getResponseValue('description', su) }}
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
import NavigationResourceReadButton from "@/components/NavigationResourceReadButton";
export default {
  name: "ItemSuRelChip",
  components: {
    NavigationResourceReadButton
  },
  mixins: [
    ResourceItemDataAccessorMixin
  ],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      menuVisible: false,
      su: {},
      loading: true
    }
  },
  async fetch() {
    if (this.item?.dxSU.id && this.menuVisible) {
      const response = await this.$store.dispatch('http/getSu', this.item.dxSU.id)
      this.su = response.data
      this.loading = false
    }
  },
  computed: {
    code() {
      return this.item?.dxSU?.number
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

<style scoped>

</style>
