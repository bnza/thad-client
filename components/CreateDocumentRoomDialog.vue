<script>
import CreateDocumentSimpleItemDialog from "@/components/CreateDocumentSimpleItemDialog";
import ResourceValidationDocumentRoomMixin from "@/mixins/validation/ResourceValidationDocumentRoomMixin";
export default {
  name: "CreateDocumentRoomDialog",
  extends: CreateDocumentSimpleItemDialog,
  mixins: [
    ResourceValidationDocumentRoomMixin
  ]
}
</script>
