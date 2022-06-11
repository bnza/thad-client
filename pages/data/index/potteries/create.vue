<template>
  <action-resource-card resource-name="pottery" action="new">
    <edit-pottery-card resource-name="pottery" :parent="creatingResourceParent"/>
  </action-resource-card>
</template>

<script>
import ResourceCreateParentMixin from "@/mixins/ResourceCreateParentMixin";
import ActionResourceCard from "@/components/ActionResourceCard";
import EditPotteryCard from "@/components/EditPotteryCard";

export default {
  name: "AppCreateSuPage",
  components: {
    ActionResourceCard,
    EditPotteryCard
  },
  mixins: [
    ResourceCreateParentMixin
  ],
  middleware: ['editor-auth']
}
</script>
