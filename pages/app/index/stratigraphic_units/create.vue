<template>
  <action-resource-card resource-name="stratigraphic_units" action="new">
    <edit-su-card resource-name="stratigraphic_units"/>
  </action-resource-card>
</template>

<script>
import ActionResourceCard from "@/components/ActionResourceCard";
import EditSuCard from "@/components/EditSuCard";

export default {
  name: "AppCreateSuPage",
  components: {
    ActionResourceCard,
    EditSuCard
  }
}
</script>
