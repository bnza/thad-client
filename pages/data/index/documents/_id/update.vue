<template>
  <action-resource-card resource-name="document" action="edit">
    <lazy-edit-document-card resource-name="document"/>
  </action-resource-card>
</template>

<script>
export default {
  name: "AppDocumentUpdatePage",
  middleware: ['editor-auth']
}
</script>
