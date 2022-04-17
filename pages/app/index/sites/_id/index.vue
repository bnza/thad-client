<template>
  <v-card>
    <v-toolbar flat>
      <navigation-prev-button />
      <v-toolbar-title>Site</v-toolbar-title>
      <v-spacer />
      <v-toolbar-title  v-if="code"><strong class="secondary--text">{{code}}</strong></v-toolbar-title>
      <v-spacer />
      <navigation-collection-resource-button resource-base-url="/app/sites" />
      <navigation-update-resource-button :item-id="id" resource-base-url="/app/sites/" :disabled="!$auth.hasScope('ROLE_ADMIN')" />
      <navigation-delete-resource-button :item-id="id" resource-base-url="/app/sites/" :disabled="!$auth.hasScope('ROLE_ADMIN')" />
      <template #extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tab>Data</v-tab>
          <v-tab>Areas</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <read-site-card @ready="code = $event" />
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          Areas
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import ResourceItemFormMixin from "@/mixins/ResourceItemFormMixin";
import NavigationPrevButton from "@/components/NavigationPrevButton";
import ReadSiteCard from "@/components/ReadSiteCard";
import NavigationCollectionResourceButton from "@/components/NavigationCollectionResourceButton";
import NavigationDeleteResourceButton from "@/components/NavigationDeleteResourceButton";
import NavigationUpdateResourceButton from "@/components/NavigationUpdateResourceButton";

export default {
  name: "AppSitePage",
  components: {
    ReadSiteCard,
    NavigationPrevButton,
    NavigationCollectionResourceButton,
    NavigationDeleteResourceButton,
    NavigationUpdateResourceButton,
  },
  mixins: [
    ResourceItemFormMixin,
  ],
  data() {
    return {
      tab: null,
      code: null
    }
  }
}
</script>

<style scoped>

</style>
