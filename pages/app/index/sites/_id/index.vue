<template>
  <v-card>
    <v-toolbar flat>
      <navigation-prev-button />
      <v-toolbar-title>Site</v-toolbar-title>
      <v-spacer />
      <v-toolbar-title v-if="item"><strong class="secondary--text">{{item.code}}</strong></v-toolbar-title>
      <v-spacer />
      <navigation-collection-resource-button resource-base-url="/app/sites" />
      <navigation-update-resource-button :item-id="routeRequestedId" resource-base-url="/app/sites/" :disabled="!$auth.hasScope('ROLE_ADMIN')" />
      <navigation-delete-resource-button :item-id="routeRequestedId" resource-base-url="/app/sites/" :disabled="!$auth.hasScope('ROLE_ADMIN')" />
      <template #extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tab href="#data">Data</v-tab>
          <v-tab href="#areas">Areas</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item value="data">
        <read-site-card v-if="item" :item="item" />
      </v-tab-item>
      <v-tab-item value="areas">
          <collection-areas-card
            v-if="ready"
            tab="areas"
            :parent="item"
            parent-request-filter-key="site.id"
          />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import ResourceItemFormMixin from "@/mixins/ResourceItemFormMixin";
import RouteTabbedComponentMixin from "@/mixins/RouteTabbedComponentMixin";
import NavigationPrevButton from "@/components/NavigationPrevButton";
import ReadSiteCard from "@/components/ReadSiteCard";
import NavigationCollectionResourceButton from "@/components/NavigationCollectionResourceButton";
import NavigationDeleteResourceButton from "@/components/NavigationDeleteResourceButton";
import NavigationUpdateResourceButton from "@/components/NavigationUpdateResourceButton";
import CollectionAreasCard from "@/components/CollectionAreasCard";

export default {
  name: "AppSitePage",
  components: {
    ReadSiteCard,
    CollectionAreasCard,
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
/*     resourceName() {
      return 'sites'
    }, */
  },
}
</script>

<style scoped>

</style>
