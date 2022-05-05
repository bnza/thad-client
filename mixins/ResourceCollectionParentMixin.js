import {isEmpty} from "ramda";

export default {
  props: {
    parentRequestFilterKey: {
      type: String,
      default: 'id'
    },
    parentFilterKey: {
      type: String,
      default: 'id'
    },
    parent: {
      default: null,
      validator (value) {
        return value === null || (typeof value === 'object')
      }
    }
  },
  computed: {
    isChild() {
      return this.parent && !isEmpty(this.parent)
    },
  }
}
