export default {
  computed: {
    countWarning() {
      return this.ready && this.wareTypeDiagnosticCount !== this.item.diagnosticWareCount
    },
    wareTypeDiagnosticCount() {
      return this.ready ?
        this.item.commonWareDiagnosticCount +
        this.item.fineWareDiagnosticCount +
        this.item.coarseWareDiagnosticCount +
        this.item.kitchenWareDiagnosticCount :
        0
    }
  }
}
