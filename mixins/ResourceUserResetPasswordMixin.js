import {mapState, mapMutations} from "vuex";

export default {
  data() {
    return {
      resettingUser: null,
      resetDialog: false
    }
  },
  computed: {
    ...mapState(['resetPasswordInfo']),
  },
  methods: {
    ...mapMutations(['clearResetPasswordInfo']),
    clearAndOpenResetDialog(resettingUser) {
      this.clearResetPasswordInfo()
      this.openResetDialog(resettingUser)
    },
    openResetDialog(resettingUser) {
      this.resettingUser = resettingUser
      this.resetDialog = true
    }
  }
}
