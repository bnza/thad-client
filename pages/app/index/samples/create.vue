<template>
  <action-resource-card resource-name="sample" action="new">
    <edit-sample-card resource-name="sample" :parent="creatingResourceParent"/>
  </action-resource-card>
</template>

<script>
import ResourceCreateParentMixin from "@/mixins/ResourceCreateParentMixin";

export default {
  name: "AppCreateSamplePage",
  mixins: [
    ResourceCreateParentMixin
  ],
  middleware: ['editor-auth']
}
</script>
