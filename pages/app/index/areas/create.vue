<template>
  <action-resource-card resource-name="areas" action="new">
    <edit-area-card resource-name="areas"/>
  </action-resource-card>
</template>

<script>
import ActionResourceCard from "@/components/ActionResourceCard";
import EditAreaCard from "@/components/EditAreaCard";

export default {
  name: "AppCreateAreaPage",
  components: {
    ActionResourceCard,
    EditAreaCard
  },
  middleware: ['editor-auth']
}
</script>

<style scoped>

</style>
