<template>
  <v-card-text>
    <v-container>
      <v-row dense>
        <v-col>
          <v-text-field
            :value="getResponseValue('email', item)"
            label="username"
            readonly
            class="mx-4"
          />
        </v-col>
        <v-col>
          <v-text-field
            :color="color"
            :value="getResponseValue('roles', item).join(',')"
            prepend-icon="mdi-account-circle"
            label="role"
            readonly
            class="mx-4"
          />
        </v-col>
        <v-col />
      </v-row>
    </v-container>
  </v-card-text>
</template>

<script>
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
import {roleColor} from "@/src/utils";

export default {
  name: "ReadUserCard",
  mixins: [
    ResourceItemDataAccessorMixin
  ],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    color() {
      return roleColor(this.item.roles[0])
    }
  }
}
</script>

<style scoped>

</style>
