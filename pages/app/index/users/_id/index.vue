<template>
  <lazy-item-user-card resource-name="user" />
</template>

<script>
export default {
  name: "AppUserPage",
  middleware: ['admin-auth'],
}
</script>
