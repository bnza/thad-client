<template>
  <v-row justify="center" align="center" class="mt-16">
    <v-col lg="8" sm="12">
      <v-card min-width="930">
        <v-card-title class="text-h2 justify-center title">
          <v-row class="mt-16">
            <v-spacer />
            <v-col sm="2">
              <UniudLogo />
              <p class="secondary--text text--black text-body-1 text-center"><strong>hic sunt futura</strong></p>
            </v-col>
            <v-col class="d-flex justify-center text-center" sm="6">
              <p><span class="secondary--text">LoNAP</span><br />
              excavations<br />
              database</p>
            </v-col>
            <v-col sm="2" class="logo py-4 d-flex justify-center">
              <NiniveLogo />
            </v-col>
            <v-spacer />
          </v-row>
        </v-card-title>
        <v-card-title class="text-subtitle-1 justify-center text-center">
          <p>Università degli Studi di Udine - Dipartimento di Studi Umanistici e del Patrimonio Culturale<br/>
          Land of Nineveh Archaeological Project</p>
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/about"> About </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  auth: false
}
</script>

<style scoped lang="sass">
  .title
    font-family: 'Asul', 'Work Sans', Arial, sans-serif !important
    font-weight: bold
</style>
