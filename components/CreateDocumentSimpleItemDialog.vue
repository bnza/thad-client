<template>
  <v-dialog
    data-cy="create-su-rel-dialog"
    :value="visible"
    width="500"
    persistent
  >
    <v-card data-cy="create-document-simple-item-card">
      <v-card-title class="text-overline mb-4 secondary--text" >
        Add {{ name }}
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="createdItem"
          :label="name"
          required
          :error-messages="itemErrors"
          class="mx-4"
          @input="$v.createdItem.$touch()"
          @blur="$v.createdItem.$touch()"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          data-cy="submit-btn"
          @click="submit"
        >
          Submit
        </v-btn>
        <v-spacer />
        <v-btn
          text
          data-cy="cancel-btn"
          @click="close"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ResourceValidationDocumentSimpleItemMixin from "@/mixins/validation/ResourceValidationDocumentSimpleItemMixin";
export default {
  name: "CreateDocumentSimpleItemDialog",
  mixins: [
    ResourceValidationDocumentSimpleItemMixin
  ],
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      createdItem: undefined,
    }
  },
  computed: {
    requestData() {
      return [...(new Set([...this.items, this.createdItem]))].sort()
    }
  },
  methods: {
    close() {
      this.createdItem = undefined
      this.$emit('close')
    },
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.$emit('update', this.requestData)
      this.createdItem = undefined
    }
  }
}
</script>

<style scoped>

</style>
