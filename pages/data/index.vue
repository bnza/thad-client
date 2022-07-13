<template>
    <div>
      <NuxtChild v-if="ready"/>
      <lazy-work-site-dialog />
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "AppPage",
  computed: {
    ...mapState('vocabularies', ['ready'])
  }
}
</script>
