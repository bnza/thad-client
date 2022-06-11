<template>
  <action-resource-card resource-name="ecofact" action="edit">
    <edit-ecofact-card resource-name="ecofact"/>
  </action-resource-card>
</template>

<script>
export default {
  name: "AppEcofactUpdatePage",
  middleware: ['editor-auth']
}
</script>
