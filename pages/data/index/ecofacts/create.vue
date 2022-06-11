<template>
  <action-resource-card resource-name="ecofact" action="new">
    <edit-ecofact-card resource-name="ecofact" :parent="creatingResourceParent"/>
  </action-resource-card>
</template>

<script>
import ResourceCreateParentMixin from "@/mixins/ResourceCreateParentMixin";

export default {
  name: "AppCreateEcofactPage",
  mixins: [
    ResourceCreateParentMixin
  ],
  middleware: ['editor-auth']
}
</script>
