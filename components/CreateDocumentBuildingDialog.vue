<script>
import CreateDocumentSimpleItemDialog from "@/components/CreateDocumentSimpleItemDialog";
import ResourceValidationDocumentBuildingMixin from "@/mixins/validation/ResourceValidationDocumentBuildingMixin";
export default {
  name: "CreateDocumentBuildingDialog",
  extends: CreateDocumentSimpleItemDialog,
  mixins: [
    ResourceValidationDocumentBuildingMixin
  ]
}
</script>
