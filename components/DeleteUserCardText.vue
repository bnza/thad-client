<template>
  <v-card-text>
    <v-container>
      <v-row dense>
        <v-col>
          <v-text-field
            :value="getResponseValue('email', item)"
            label="user"
            readonly
          />
        </v-col>
        <v-col>
          <v-text-field
            :value="getResponseValue('roles', item).join(',')"
            label="roles"
            readonly
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>

<script>
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
export default {
  name: "DeleteUserCardText",
  mixins: [
    ResourceItemDataAccessorMixin
  ],
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
