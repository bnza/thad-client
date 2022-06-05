<template>
  <action-resource-card resource-name="grave" action="edit">
    <lazy-edit-grave-card resource-name="grave"/>
  </action-resource-card>
</template>

<script>
export default {
  name: "AppSuUpdatePage",
  middleware: ['editor-auth']
}
</script>
