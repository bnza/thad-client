<template>
  <action-resource-card resource-name="smallFind" action="new">
    <edit-small-find-card resource-name="smallFind" :parent="creatingResourceParent"/>
  </action-resource-card>
</template>

<script>
import ResourceCreateParentMixin from "@/mixins/ResourceCreateParentMixin";

export default {
  name: "AppCreateSmallFindPage",
  mixins: [
    ResourceCreateParentMixin
  ],
  middleware: ['editor-auth']
}
</script>
