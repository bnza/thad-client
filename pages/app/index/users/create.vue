<template>
  <action-resource-card resource-name="user" action="new">
    <lazy-edit-user-card resource-name="user"/>
  </action-resource-card>
</template>

<script>

export default {
  name: "AppCreateUserPage",
  middleware: ['admin-auth']
}
</script>
