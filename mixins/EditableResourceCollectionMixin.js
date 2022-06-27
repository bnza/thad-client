export default {
  data() {
    return {
      isEditingEnabled: false,
    }
  },
  computed: {
    editingButtonTooltip() {
      return this.isEditingEnabled ? 'Disable editing' : 'Enable editing'
    },
    editingButtonIcon() {
      return this.isEditingEnabled ? 'mdi-pencil-outline' : 'mdi-pencil'
    },
  }
}
