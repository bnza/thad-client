<template>
  <action-resource-card resource-name="area" action="new">
    <edit-area-card resource-name="area" :parent="creatingResourceParent"/>
  </action-resource-card>
</template>

<script>
import ResourceCreateParentMixin from "@/mixins/ResourceCreateParentMixin";
import ActionResourceCard from "@/components/ActionResourceCard";
import EditAreaCard from "@/components/EditAreaCard";

export default {
  name: "AppCreateAreaPage",
  components: {
    ActionResourceCard,
    EditAreaCard
  },
  mixins: [
    ResourceCreateParentMixin
  ],
  middleware: ['editor-auth'],
}
</script>

<style scoped>

</style>
