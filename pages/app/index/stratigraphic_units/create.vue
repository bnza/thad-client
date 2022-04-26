<template>
  <action-resource-card resource-name="stratigraphicUnit" action="new">
    <edit-su-card resource-name="stratigraphicUnit"/>
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
  },
  middleware: ['editor-auth']
}
</script>
