export default {
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    show() {
      if (this.disabled) {
        return
      }
      this.showModal = true
      /**
       * Open event for event listening
       *
       * @event open
       * @type {String}
       */
      this.$emit("open")
    },
    close(okOrCancel) {
      this.showModal = false
      /**
       * Close event for event listening
       *
       * @event closed
       * @type {Boolean}
       */
      this.$emit("closed", okOrCancel)
      if (okOrCancel) {
        /**
         * Confirm event for event listening
         *
         * @event confirm
         */
        this.$emit("confirm")
      } else {
        /**
         * Cancel event for event listening
         *
         * @event cancel
         */
        this.$emit("cancel")
      }
    },
    onKeyup(event) {
      // Escape key
      if (event.keyCode === 27 && !document.querySelector(".swal2-container")) {
        this.close(false)
      }
    }
  },
  mounted() {
    document.addEventListener("keyup", this.onKeyup)
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.onKeyup)
  }
}
