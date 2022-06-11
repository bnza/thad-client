<template>
  <action-resource-card resource-name="sample" action="edit">
    <edit-sample-card resource-name="sample"/>
  </action-resource-card>
</template>

<script>
export default {
  name: "AppSampleUpdatePage",
  middleware: ['editor-auth']
}
</script>
