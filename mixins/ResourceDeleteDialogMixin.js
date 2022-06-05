export default {
  data() {
    return {
      deleteDialog: false,
      deletingItem: null
    }
  },
  methods: {
    closeDeleteDialog() {
      this.deleteDialog = false
      this.deletingItem = null
    },
    openDeleteDialog(item) {
      this.deletingItem = item
      this.deleteDialog = true
    },
    resetAndFetch() {
      this.deleteDialog = false
      this.deletingItem = null
      this.$fetch()
    },
    resetAndPrev() {
      this.deleteDialog = false
      this.deletingItem = null
      this.$router.go(-1)
    },
  }
}
