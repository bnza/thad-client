import {mapActions} from "vuex";
import {clone} from "ramda";
import ResourceNavigationMixin from "@/mixins/ResourceNavigationMixin";
import ResourceItemDataAccessorMixin from "@/mixins/ResourceItemDataAccessorMixin";

export default {
  mixins: [
    ResourceItemDataAccessorMixin,
    ResourceNavigationMixin
  ],
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    parent: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      modelItem: {}
    }
  },
  computed: {
    defaultModelItem() {
      return {}
    }
  },
  methods: {
    ...mapActions('http', [
      'request',
    ]),
    async submit() {
      if (this.$v){
        this.$v.$touch()
        if (this.$v.$invalid) {
          return
        }
      }
      try {
        await this.request({
          method: 'post',
          url: this.resource.collectionUrl,
          data: this.requestData,
          headers: {
            Accept: 'application/ld+json'
          }
        })
        this.close()
        this.$emit('created')
      } catch (e) {
        await this.$store.dispatch('snackbar/requestError', e)
      }
    },
    reset() {
      this.modelItem = clone(this.defaultModelItem)
    },
    close() {
      this.reset()
      this.$emit('update:visible', false)
    }
  },
  created() {
    this.reset()
  }
}
