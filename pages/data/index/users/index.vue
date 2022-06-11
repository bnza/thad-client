<template>
  <lazy-collection-users-card resource-name="user"/>
</template>

<script>
export default {
  name: "IndexUsersPage",
  middleware: ['admin-auth'],
}
</script>
