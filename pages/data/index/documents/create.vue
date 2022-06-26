<template>
  <action-resource-card resource-name="document" action="new" :loading="loading">
    <edit-document-card resource-name="document" :parent="creatingResourceParent" :loading.sync="loading"/>
  </action-resource-card>
</template>

<script>
import ResourceCreateParentMixin from "@/mixins/ResourceCreateParentMixin";

export default {
  name: "AppCreateDocumentPage",
  mixins: [
    ResourceCreateParentMixin
  ],
  middleware: ['editor-auth'],
  data() {
    return {
      loading: false
    }
  }
}
</script>
