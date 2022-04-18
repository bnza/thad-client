<template>
  <div>
    <navigation-resource-read-button :item-id="itemId" :resource-base-url="resourceBaseUrl" />
    <navigation-update-resource-button :item-id="itemId" :resource-base-url="resourceBaseUrl" :disabled="disabled" />
    <navigation-delete-resource-button
      :item-id="itemId"
      :resource-base-url="resourceBaseUrl"
      :disabled="disabled"
      @delete="$emit('delete')"
    />
  </div>
</template>

<script>
import NavigationUpdateResourceButton from "@/components/NavigationUpdateResourceButton";
import NavigationDeleteResourceButton from "@/components/NavigationDeleteResourceButton";
import NavigationResourceReadButton from "@/components/NavigationResourceReadButton";

export default {
  name: "NavigationResourceItemCrud",
  components: {
    NavigationUpdateResourceButton,
    NavigationDeleteResourceButton,
    NavigationResourceReadButton
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
      required: true,
      validation: v => !isNaN(v) && Number.isInteger(+v)
    },
  },
  computed: {
    disabled() {
      return !this.$auth.hasScope(this.scope)
    }
  }
}
</script>
