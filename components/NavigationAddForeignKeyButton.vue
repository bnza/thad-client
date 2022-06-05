<script>
import {mapMutations} from "vuex";
import ResourceCollectionParentMixin from "~/mixins/ResourceCollectionParentMixin";
import CreateResourceButton from "@/components/CreateResourceButton";

export default {
  name: "NavigationAddForeignKeyButton",
  extends: CreateResourceButton,
  mixins: [
    ResourceCollectionParentMixin
  ],
  methods: {
    ...mapMutations(['setCreatingResourceParent']),
    openDialog() {
      this.$emit('click')
    }
  }
}
</script>
