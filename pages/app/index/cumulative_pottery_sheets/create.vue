<template>
  <action-resource-card resource-name="cumulativePotterySheet" action="new">
    <edit-cumulative-pottery-sheet-card resource-name="cumulativePotterySheet" :parent="creatingResourceParent"/>
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
