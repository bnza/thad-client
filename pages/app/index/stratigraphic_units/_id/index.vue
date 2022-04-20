<template>
  <v-card>
    <v-toolbar flat dense>
      <navigation-prev-button />
      <v-toolbar-title>Stratigraphic unit</v-toolbar-title>
      <v-spacer />
      <v-toolbar-title v-if="ready"><strong class="secondary--text">{{code}}</strong></v-toolbar-title>
      <v-spacer />
      <navigation-collection-resource-button resource-base-url="/app/stratigraphic_units" />
      <navigation-update-resource-button :item-id="routeRequestedId" resource-base-url="/app/stratigraphic_units/" :disabled="!$auth.hasScope('ROLE_EDITOR')" />
      <navigation-delete-resource-button :item-id="routeRequestedId" resource-base-url="/app/stratigraphic_units/" :disabled="!$auth.hasScope('ROLE_EDITOR')" />
      <template #extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tab href="#data">Data</v-tab>
          <v-tab href="#rels">Relationships</v-tab>
          <v-tab href="#pottery">Pottery</v-tab>
          <v-tab href="#c_pottery">Cumulative pottery</v-tab>
          <v-tab href="#finds">Small finds</v-tab>
          <v-tab href="#eco">Ecofacts</v-tab>
          <v-tab href="#images">Images</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item value="data">
        <read-su-card v-if="ready" :item="item" />
      </v-tab-item>
      <v-tab-item value="rels">
        <v-card-text>
          Relationships
        </v-card-text>
      </v-tab-item>
      <v-tab-item value="pottery">
        <v-card-text>
          Pottery
        </v-card-text>
      </v-tab-item>
      <v-tab-item value="c_pottery">
        <v-card-text>
          Cumulative pottery
        </v-card-text>
      </v-tab-item>
      <v-tab-item value="finds">
        <v-card-text>
          Small finds
        </v-card-text>
      </v-tab-item>
      <v-tab-item value="eco">
        <v-card-text>
         Ecofacts
        </v-card-text>
      </v-tab-item>
      <v-tab-item value="images">
        <v-card-text>
          Images
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import ResourceItemFormMixin from "@/mixins/ResourceItemFormMixin";
import RouteTabbedComponentMixin from "@/mixins/RouteTabbedComponentMixin";
import NavigationPrevButton from "@/components/NavigationPrevButton";
import ReadSuCard from "@/components/ReadSuCard";
import NavigationCollectionResourceButton from "@/components/NavigationCollectionResourceButton";
import NavigationDeleteResourceButton from "@/components/NavigationDeleteResourceButton";
import NavigationUpdateResourceButton from "@/components/NavigationUpdateResourceButton";

export default {
  name: "AppSuPage",
  components: {
    ReadSuCard,
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
      return this.ready ? `${this.item.site.code}.${this.item.number.toString().padStart(4,'0')}` : ''
    },
/*     resourceName() {
      return 'stratigraphic_units'
    }, */
  },
}
</script>

<style scoped>

</style>
