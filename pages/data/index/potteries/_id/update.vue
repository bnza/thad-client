<template>
  <action-resource-card resource-name="pottery" action="edit">
    <edit-pottery-card resource-name="pottery"/>
  </action-resource-card>
</template>

<script>
import ActionResourceCard from "@/components/ActionResourceCard";
export default {
  name: "AppPotteryUpdatePage",
  components: {
    ActionResourceCard,
  },
  middleware: ['editor-auth']
}
</script>
