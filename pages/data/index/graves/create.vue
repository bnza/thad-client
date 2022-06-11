<template>
  <action-resource-card resource-name="grave" action="new">
    <lazy-edit-grave-card resource-name="grave" :parent="creatingResourceParent"/>
  </action-resource-card>
</template>

<script>
import ResourceCreateParentMixin from "@/mixins/ResourceCreateParentMixin";

export default {
  name: "AppCreateGravePage",
  mixins: [
    ResourceCreateParentMixin
  ],
  middleware: ['editor-auth']
}
</script>
