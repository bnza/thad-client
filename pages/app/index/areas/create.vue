<template>
  <action-resource-card resource-name="areas" action="new">
    <create-area-card />
  </action-resource-card>
</template>

<script>
import ActionResourceCard from "@/components/ActionResourceCard";
import CreateAreaCard from "@/components/CreateAreaCard";

export default {
  name: "AppCreateAreaPage",
  components: {
    ActionResourceCard,
    CreateAreaCard
  }
}
</script>

<style scoped>

</style>
