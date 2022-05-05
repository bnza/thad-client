import {mapMutations} from "vuex";
import {clone} from "ramda";

export default {
  data() {
    return {
      creatingResourceParent: null
    }
  },
  created() {
    if (this.$store.state.creatingResourceParent) {
      this.creatingResourceParent = clone(this.$store.state.creatingResourceParent)
      this.setCreatingResourceParent(null)
    }
  },
  methods: {
    ...mapMutations(['setCreatingResourceParent'])
  }
}
