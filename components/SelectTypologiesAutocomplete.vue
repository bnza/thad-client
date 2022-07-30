<script>
import SelectUnionResourceAutocomplete from "@/components/SelectUnionResourceAutocomplete";
export default {
  name: "SelectTypologiesAutocomplete",
  extends: SelectUnionResourceAutocomplete,
  async fetch() {
    this.loading = true
    try {
      const response = await this.$store.dispatch('http/getTypologies', {
        apiPrefix: this.$config.apiPrefix,
        search: this.search
      });
      this.items = response.data.map(
        item => item.code
      )
    } catch (e) {
      await this.$store.dispatch('snackbar/requestError', e)
    } finally {
      this.loading = false
    }
  },
}
</script>
