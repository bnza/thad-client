<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-icon
        v-bind="attrs" large
        color="secondary"
        v-on="on"
      >
        mdi-alert-outline
      </v-icon>
    </template>
    <span>Diagnostic sherd count mismatch.<br/>
              by ware: {{wareDiagnosticCount}}<br />
              by period: {{periodDiagnosticCount}}
            </span>
  </v-tooltip>
</template>

<script>
export default {
  name: "DiagnosticSherdCountAlert",
  props: {
    wareDiagnosticCount: {
      type: Number,
      required: true
    },
    periodDiagnosticCount: {
      type: Number,
      required: true
    },
  }
}
</script>
