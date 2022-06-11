<template>
  <action-resource-card resource-name="stratigraphicUnit" action="new">
    <edit-su-card resource-name="stratigraphicUnit" :parent="creatingResourceParent"/>
  </action-resource-card>
</template>

<script>
import ResourceCreateParentMixin from "@/mixins/ResourceCreateParentMixin";
import ActionResourceCard from "@/components/ActionResourceCard";
import EditSuCard from "@/components/EditSuCard";

export default {
  name: "AppCreateSuPage",
  components: {
    ActionResourceCard,
    EditSuCard
  },
  mixins: [
    ResourceCreateParentMixin
  ],
  middleware: ['editor-auth']
}
</script>
