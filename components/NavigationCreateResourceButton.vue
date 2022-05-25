<script>
import {mapMutations} from "vuex";
import ResourceCollectionParentMixin from "~/mixins/ResourceCollectionParentMixin";
import CreateResourceButton from "@/components/CreateResourceButton";

export default {
  name: "NavigationCreateResourceButton",
  extends: CreateResourceButton,
  mixins: [
    ResourceCollectionParentMixin
  ],
  methods: {
    ...mapMutations(['setCreatingResourceParent']),
    openDialog() {
      if (this.parent) {
        this.setCreatingResourceParent(this.parent)
      }
      this.$router.push(this.createResourcePath)
    }
  }
}
</script>
