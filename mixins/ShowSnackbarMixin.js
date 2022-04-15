import {mapActions} from "vuex";

export default {
  methods: {
    ...mapActions('snackbar', {
      showSnackbar: 'show'
    }),
  }
}
