<template>
  <action-resource-card resource-name="user" action="edit">
    <lazy-edit-user-card resource-name="user"/>
  </action-resource-card>
</template>

<script>
export default {
  name: "AppUserUpdatePage",
  middleware: ['admin-auth']
}
</script>
