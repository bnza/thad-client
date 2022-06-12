<template>
  <div class="text-center">
    <v-dialog
      :value="workSiteDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="warning--text">
          {{hasProposedWorkSite ? 'Set' : 'Unset'}} work site
        </v-card-title>
        <v-card-text>
          <p v-if="!hasProposedWorkSite">This actions will unset the current work site and the application will work with the whole dataset.</p>
          <p v-else>This actions will set a working site. All related data will be filter and only matching results will be shown</p>
          <delete-site-card-text v-if="hasProposedWorkSite" :item="proposedWorkSite" />
          <br /><p>Would you like to proceed?</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            data-cy="cancel_btn"
            text
            @click="close"
        >
          Cancel
        </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            data-cy="logout-btn"
            color="warning"
            text
            @click="submit"
          >
            {{hasWorkSite ? 'Unset' : 'Set'}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapMutations, mapState, mapGetters} from "vuex";

export default {
  name: "WorkSiteDialog",
  computed: {
    ...mapState(['workSite', 'proposedWorkSite', 'workSiteDialog']),
    ...mapGetters(['hasWorkSite', 'hasProposedWorkSite']),
    dialog() {
      return this.workSite !== this.proposedWorkSite
    }
  },
  methods: {
    ...mapMutations(['setWorkSite', 'setWorkSiteDialog']),
    submit() {
      this.setWorkSite(this.proposedWorkSite)
      this.close()
    },
    close()
    {
      this.setWorkSiteDialog(false)
    }
  }
}
</script>

<style scoped>

</style>
