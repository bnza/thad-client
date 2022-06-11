<template>
  <action-resource-card resource-name="smallFind" action="edit">
    <edit-small-find-card resource-name="smallFind"/>
  </action-resource-card>
</template>

<script>
export default {
  name: "AppSmallFindUpdatePage",
  middleware: ['editor-auth']
}
</script>
