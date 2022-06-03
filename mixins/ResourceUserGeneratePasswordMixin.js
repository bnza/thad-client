import {mapMutations} from "vuex";
import {generatePassword} from "~/src/utils";

const storeResetPasswordInfo = async (vm, responseData) => {
  if (vm.mustGeneratePassword) {
    const password = vm.modelItem.password
    await vm.setResetPasswordInfo({...responseData, password})
  }
}

export default {
  computed: {
    mustGeneratePassword() {
      return true
    },
  },
  methods: {
    ...mapMutations(['setResetPasswordInfo', 'clearResetPasswordInfo']),
    async beforeSubmit() {
      if (this.mustGeneratePassword) {
        this.modelItem.password = await generatePassword(8)
      }
    },
    async afterCreate(response) {
      await storeResetPasswordInfo(this, response.data)
    },
    async afterUpdate(response) {
      await storeResetPasswordInfo(this, response.data)
    },
  }
}
