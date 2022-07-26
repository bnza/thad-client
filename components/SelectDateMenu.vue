<template>
  <v-menu
    ref="menu"
    v-model="dateMenu"
    :close-on-content-click="false"
    :return-value.sync="modelDate"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="modelDate"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="modelDate"
      no-title
      scrollable
    >
      <v-spacer></v-spacer>
      <v-btn
        text
        color="primary"
        @click="dateMenu = false"
      >
        Cancel
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="$refs.menu.save(modelDate)"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "SelectDateMenu",
  props: {
    date: {
      default: null
    },
    label: {
      type: String,
      default: 'date'
    }
  },
  data() {
    return {
      dateMenu: false
    }
  },
  computed: {
    modelDate: {
      get() {
        return this.date
      },
      set(value) {
        this.$emit('update:date', value)
      }
    }
  }
}
</script>

<style scoped>

</style>
