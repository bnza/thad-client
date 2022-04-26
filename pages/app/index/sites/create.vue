<template>
  <action-resource-card resource-name="site" action="new">
    <edit-site-card resource-name="site"/>
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
  },
  middleware: ['admin-auth']
}
</script>
