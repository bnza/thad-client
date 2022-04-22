<template>
  <action-resource-card resource-name="sites" action="edit">
    <update-site-card resource-name="sites"/>
  </action-resource-card>
</template>

<script>
import ActionResourceCard from "@/components/ActionResourceCard";
import UpdateSiteCard from "@/components/UpdateSiteCard";
export default {
  name: "AppSiteUpdatePage",
  components: {
    ActionResourceCard,
    UpdateSiteCard
  },
  middleware: ['admin-auth']
}
</script>

<style scoped>

</style>
