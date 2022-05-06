<template>
  <div
    data-cy="item-crud-navigation"
  >
    <slot />
    <navigation-resource-read-button :item-id="itemId" :resource-name="resourceName" />
    <navigation-update-resource-button :item-id="itemId" :resource-name="resourceName" :disabled="disabled" />
    <navigation-delete-resource-button
      :item-id="itemId"
      :resource-name="resourceName"
      :disabled="disabled"
      @delete="$emit('delete')"
    />
  </div>
</template>

<script>
import NavigationUpdateResourceButton from "@/components/NavigationUpdateResourceButton";
import NavigationDeleteResourceButton from "@/components/NavigationDeleteResourceButton";
import NavigationResourceReadButton from "@/components/NavigationResourceReadButton";
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";

export default {
  name: "NavigationResourceItemCrud",
  components: {
    NavigationUpdateResourceButton,
    NavigationDeleteResourceButton,
    NavigationResourceReadButton
  },
  mixins: [
    ResourceNavigationMixin
  ],
  props: {
    scope: {
      type: String,
      default: 'ROLE_ADMIN'
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
