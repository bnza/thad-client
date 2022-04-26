<template>
  <action-resource-card resource-name="area" action="new">
    <edit-area-card resource-name="area"/>
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
