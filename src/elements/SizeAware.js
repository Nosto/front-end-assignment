let comp = {
  methods: {
    resizer() {
      // override
    }
  },
  updated() {
    this.resizer()
  }
}

if (window.ResizeObserver) {
  Object.assign(comp, {
    mounted() {
      this.resizer()
      this.observer = new ResizeObserver(this.resizer)
      this.observer.observe(this.$el)
    },
    beforeDestroy() {
      this.observer.disconnect()
    }
  })
} else if (window.MutationObserver) {
  Object.assign(comp, {
    mounted() {
      this.resizer()
      window.addEventListener("resize", this.resizer)
      this.observer = new MutationObserver(this.resizer)
      this.observer.observe(this.$el, { attributes: true, attributeFilter: ["style"] })
      this.observer.observe(this.$el.parentElement, { attributes: true, attributeFilter: ["style"] })
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.resizer)
      this.observer.disconnect()
    }
  })
} else {
  Object.assign(comp, {
    mounted() {
      this.resizer()
      window.addEventListener("resize", this.resizer)
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.resizer)
    }
  })
}

export default comp
