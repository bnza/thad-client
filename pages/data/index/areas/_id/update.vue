<template>
  <action-resource-card resource-name="area" action="edit">
    <edit-area-card resource-name="area"/>
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
