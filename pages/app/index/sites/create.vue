<template>
  <action-resource-card resource-name="sites" action="edit">
    <create-site-card />
  </action-resource-card>
</template>

<script>
import ActionResourceCard from "@/components/ActionResourceCard";
import CreateSiteCard from "@/components/CreateSiteCard";

export default {
  name: "AppCreateSitePage",
  components: {
    ActionResourceCard,
    CreateSiteCard
  }
}
</script>

<style scoped>

</style>
