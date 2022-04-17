<template>
  <action-resource-card resource-name="sites" action="edit">
    <update-site-card />
  </action-resource-card>
</template>

<script>
import ActionResourceCard from "@/components/ActionResourceCard";
import UpdateSiteCard from "@/components/UpdateSiteCard";
export default {
  name: "AppSiteEdit",
  components: {
    ActionResourceCard,
    UpdateSiteCard
  }
}
</script>

<style scoped>

</style>
