<template>
  <v-card>
    <v-toolbar flat dense>
      <v-toolbar-title>Stratigraphic unit</v-toolbar-title>
      <v-spacer />
      <v-toolbar-title  v-if="code"><strong class="secondary--text">{{code}}</strong></v-toolbar-title>
      <template #extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tab>Data</v-tab>
          <v-tab>Relationships</v-tab>
          <v-tab>Pottery</v-tab>
          <v-tab>Cumulative pottery</v-tab>
          <v-tab>Small finds</v-tab>
          <v-tab>Ecofacts</v-tab>
          <v-tab>Images</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <read-sus-card @ready="code = $event" />
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          Relationships
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          Pottery
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          Cumulative pottery
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          Small finds
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
         Ecofacts
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          Images
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import ReadSusCard from "@/components/ReadSusCard";
export default {
  name: "AppSuPage",
  components: {
    ReadSusCard
  },
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
