<template>
    <v-card-text>
        <v-container>
          <v-row dense>
            <v-col data-cy="username-input-col">
              <v-text-field
                v-if="isUpdate"
                :value="getResponseValue('email', modelItem)"
                label="username"
                readonly
                class="mx-4"
              />
              <v-text-field
                v-else
                v-model="modelItem.email"
                :error-messages="emailErrors"
                label="username"
                class="mx-4"
                @input="$v.modelItem.email.$touch()"
                @blur="$v.modelItem.email.$touch()"
              />
            </v-col>
            <v-col data-cy="roles-input-col">
              <v-radio-group
                v-model="roles"
                :error-messages="rolesErrors"
              >
                <v-radio
                  label="ROLE_ADMIN"
                  color="error"
                  value="ROLE_ADMIN"
                />
                <v-radio
                  label="ROLE_EDITOR"
                  color="warning"
                  value="ROLE_EDITOR"
                />
                <v-radio
                  label="ROLE_USER"
                  color="success"
                  value="ROLE_USER"
                />
              </v-radio-group>
            </v-col>
          </v-row>
        </v-container>
    </v-card-text>
</template>

<script>
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
import ResourceValidationUserMixin from "@/mixins/validation/ResourceValidationUserMixin";
import ResourceCollectionParentMixin from "@/mixins/ResourceCollectionParentMixin";
import ResourceItemEditMixin from "@/mixins/ResourceItemEditMixin";
import ResourceUserGeneratePasswordMixin from "@/mixins/ResourceUserGeneratePasswordMixin";

export default {
  name: "EditUserCard",
  mixins: [
    ResourceItemDataAccessorMixin,
    ResourceNavigationMixin,
    ResourceValidationUserMixin,
    ResourceCollectionParentMixin,
    ResourceItemEditMixin,
    ResourceUserGeneratePasswordMixin
  ],
  data() {
    return {
      modelItem: {
        roles: ['ROLE_USER']
      },
    }
  },
  computed: {
    mustGeneratePassword() {
      return !this.isUpdate
    },
    roles: {
      get() {
        return this.modelItem.roles[0]
      },
      set(role) {
        this.modelItem.roles = [role]
      }
    }
  },
  // watch: {
  //   'modelItem.email': {
  //     handler() {
  //       if (!this.isUpdate && !this.$v.$invalid) {
  //         this.modelItem.password = generatePassword(8)
  //       }
  //     }
  //   }
  // }
}
</script>
