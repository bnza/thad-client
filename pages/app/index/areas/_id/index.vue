<template>
  <v-card>
    <v-toolbar flat>
      <navigation-prev-button />
      <v-toolbar-title>Area</v-toolbar-title>
      <v-spacer />
      <v-toolbar-title v-if="item"><strong class="secondary--text">{{code}}</strong></v-toolbar-title>
      <v-spacer />
      <navigation-collection-resource-button resource-base-url="/app/areas/" />
      <navigation-update-resource-button :item-id="routeRequestedId" resource-base-url="/app/areas/" :disabled="!$auth.hasScope('ROLE_ADMIN')" />
      <navigation-delete-resource-button :item-id="routeRequestedId" resource-base-url="/app/areas/" :disabled="!$auth.hasScope('ROLE_ADMIN')" />
      <template #extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tab href="#data">Data</v-tab>
          <v-tab href="#sus">SUS</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item value="data">
        <read-area-card v-if="ready" :item="item" />
      </v-tab-item>
      <v-tab-item value="sus">
        <collection-sus-card
          v-if="ready"
          tab="sus"
          :parent="item"
          parent-request-filter-key="area.id"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import ResourceItemFormMixin from "@/mixins/ResourceItemFormMixin";
import RouteTabbedComponentMixin from "@/mixins/RouteTabbedComponentMixin";
import ReadAreaCard from "@/components/ReadAreaCard";
import CollectionSusCard from "@/components/CollectionSusCard";
import NavigationPrevButton from "@/components/NavigationPrevButton";
import NavigationCollectionResourceButton from "@/components/NavigationCollectionResourceButton";
import NavigationDeleteResourceButton from "@/components/NavigationDeleteResourceButton";
import NavigationUpdateResourceButton from "@/components/NavigationUpdateResourceButton";
export default {
  name: "AppAreaPage",
  components: {
    CollectionSusCard,
    ReadAreaCard,
    NavigationPrevButton,
    NavigationCollectionResourceButton,
    NavigationDeleteResourceButton,
    NavigationUpdateResourceButton,
  },
  mixins: [
    ResourceItemFormMixin,
    RouteTabbedComponentMixin
  ],
  computed: {
    code() {
      // return this.item ? `${this.item.site.code}.${this.item.number.toString().padStart(4,'0')}` : ''
      return this.ready ? `${this.item.site.code}.${this.item.code}` : ''
    },
    resourceName() {
      return 'areas'
    },
  }
}
</script>
