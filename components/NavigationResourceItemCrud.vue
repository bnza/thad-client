<template>
  <fragment>
    <navigation-update-resource-button :item-id="itemId" :resource-base-url="resourceBaseUrl" :disabled="disabled" />
    <navigation-delete-resource-button
      :item-id="itemId"
      :resource-base-url="resourceBaseUrl"
      :disabled="disabled"
      @delete="$emit('delete')"
    />
  </fragment>
</template>

<script>
// eslint-disable-next-line import/named
import { Fragment } from 'vue-frag'
import NavigationUpdateResourceButton from "@/components/NavigationUpdateResourceButton";
import NavigationDeleteResourceButton from "@/components/NavigationDeleteResourceButton";

export default {
  name: "NavigationResourceItemCrud",
  components: {
    Fragment,
    NavigationUpdateResourceButton,
    NavigationDeleteResourceButton
  },
  props: {
    scope: {
      type: String,
      default: 'ROLE_ADMIN'
    },
    resourceBaseUrl: {
      type: String,
      required: true
    },
    itemId: {
      type: String,
      required: true
    },
  },
  computed: {
    disabled() {
      return !this.$auth.hasScope('ROLE_ADMIN')
    }
  }
}
</script>
