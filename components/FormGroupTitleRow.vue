<template>
  <v-row dense>
    <v-col>
      <p class="subtitle-2 form-group-title">{{ text }}</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "FormGroupTitleRow",
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>
