<template>
  <action-resource-card resource-name="sites" action="new">
    <edit-site-card resource-name="sites"/>
  </action-resource-card>
</template>

<script>
import ActionResourceCard from "@/components/ActionResourceCard";
import EditSiteCard from "@/components/EditSiteCard";

export default {
  name: "AppCreateSitePage",
  components: {
    ActionResourceCard,
    EditSiteCard
  }
}
</script>

<style scoped>

</style>
