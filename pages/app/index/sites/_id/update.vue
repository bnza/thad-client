<template>
  <action-resource-card resource-name="site" action="edit">
    <edit-site-card resource-name="site"/>
  </action-resource-card>
</template>

<script>
import ActionResourceCard from "@/components/ActionResourceCard";
import EditSiteCard from "@/components/EditSiteCard";
export default {
  name: "AppSiteUpdatePage",
  components: {
    ActionResourceCard,
    EditSiteCard
  },
  middleware: ['admin-auth']
}
</script>

<style scoped>

</style>
