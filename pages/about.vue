<template>
  <v-row class="my-16">
    <v-spacer />
    <v-col sm="10">
      <v-card rounded>
        <v-card-title class="text-h2 justify-center title">
          <v-row class="ma-8">
            <v-col class="d-flex justify-center text-center" sm="12">
              <p><span class="secondary--text">LoNAP</span>&nbsp;
                excavations&nbsp;
                database</p>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="text-body-1 ma-8 pa-8">
          <p>This database and the related web application was conceived to archive and manage the data collected by the excavation projects carried out
            in the framework of the
            <a href="http://www.terradininive.com/" target="_blank">Land of Nineveh Archaeological Project</a> (<strong class="secondary--text">LoNAP</strong>) starting from 2022.</p><br />
          <p class="my-16">
            <strong class="secondary--text">Database design:</strong> Daniele Morandi Bonacossi, Francesca Simi, Costanza Coppini, Katia Gavagnin and Pietro Baldassarri<br/>
            <strong class="secondary--text">Full stack development:</strong> Pietro Baldassarri (<a href="mailto:pietro.baldassarri@gmail.com">pietro.baldassarri@gmail.com</a>)<br/>
            <strong class="secondary--text">IT/cloud expert:</strong> Silvano Bertossa (<a href="mailto:silvano.bertossa@gmail.com">silvano.bertossa@gmail.com</a>)<br/>
            <strong class="secondary--text">Webmaster:</strong> Michele Abis (<a href="mailto:info@micheleabis.com">info@micheleabis.com</a>)
          </p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-spacer />
  </v-row>
</template>

<script>
export default {
  name: 'AboutPage',
  auth:false
}
</script>

<style scoped lang="sass">
.title
  font-family: 'Asul', 'Work Sans', Arial, sans-serif !important
  font-weight: bold
</style>
