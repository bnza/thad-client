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

const isInteger = v => !isNaN(v) && Number.isInteger(+v)
const isString = v => typeof v === 'string' || v instanceof String
const isUuid = v => isString(v) && v.test(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[089ab][\da-f]{3}-[\da-f]{12}$/)

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
    forceDisable: {
      type: Boolean,
      default: false
    },
    scope: {
      type: String,
      default: 'ROLE_ADMIN'
    },
    itemId: {
      required: true,
      validation: v => isInteger(v) || isUuid(v)
    },
  },
  computed: {
    disabled() {
      return this.forceDisable || !this.$auth.hasScope(this.scope)
    }
  }
}
</script>
