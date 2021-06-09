export default {
  props: {
    i18n: {
      type: String
    }
  },
  computed: {
    localized() {
      let fn = this.$i18n || (key => key)
      return this.i18n && fn(this.i18n)
    }
  }
}
