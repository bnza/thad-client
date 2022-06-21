<template>
  <v-row justify="center" align="center" class="mt-16">
    <v-col sm="8">
      <v-card>
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
        <v-card-title class="text-subtitle-1 justify-center">
          Università degli Studi di Udine - Dipartimento di Studi Umanistici e del Patrimonio Culturale
        </v-card-title>
<!--        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
          <p>
            For more information on Vuetify, check out the
            <a
              href="https://vuetifyjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation </a
            >.
          </p>
          <p>
            If you have questions, please join the official
            <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="chat"
            >
              discord </a
            >.
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              issue board </a
            >.
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3" />
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br />
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>-->
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
