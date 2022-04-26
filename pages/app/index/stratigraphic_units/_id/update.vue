<template>
  <action-resource-card resource-name="stratigraphicUnit" action="edit">
    <edit-su-card resource-name="stratigraphicUnit"/>
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
  },
  middleware: ['editor-auth']
}
</script>
