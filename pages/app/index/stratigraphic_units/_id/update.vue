<template>
  <action-resource-card resource-name="stratigraphic_units" action="edit">
    <edit-su-card resource-name="stratigraphic_units"/>
  </action-resource-card>
</template>

<script>
import ActionResourceCard from "@/components/ActionResourceCard";
import EditSuCard from "@/components/EditSuCard";
export default {
  name: "AppSuUpdatePage",
  components: {
    ActionResourceCard,
    EditSuCard
  }
}
</script>
