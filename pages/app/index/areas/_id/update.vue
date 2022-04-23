<template>
  <action-resource-card resource-name="areas" action="edit">
    <edit-area-card resource-name="areas"/>
  </action-resource-card>
</template>

<script>
import ActionResourceCard from "@/components/ActionResourceCard";
import EditAreaCard from "@/components/EditAreaCard";
export default {
  name: "AppSiteUpdatePage",
  components: {
    ActionResourceCard,
    EditAreaCard
  },
  middleware: ['admin-auth']
}
</script>
