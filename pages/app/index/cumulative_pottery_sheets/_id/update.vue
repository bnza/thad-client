<template>
  <action-resource-card resource-name="cumulativePotterySheet" action="edit">
    <edit-cumulative-pottery-sheet-card resource-name="cumulativePotterySheet"/>
  </action-resource-card>
</template>

<script>
export default {
  name: "AppCumulativePotteryUpdatePage",
  middleware: ['editor-auth']
}
</script>
