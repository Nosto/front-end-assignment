<template>
  <div  class="kpi-wrapper" :loading="ghostLoad && loading">
    <span class="title" :class="{hide: ghostLoad && loading}">{{ title }}</span>
    <span class="value" v-bind="{variation, small, clickable}" :class="{hide: ghostLoad && loading}" @click="emitClick">
      {{value}}
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import "Kpi.scss";
</style>

<script>
export default {
  name: "Kpi",
  status: "ready",
  props: {
    /**
     * Title
     */
    title: {
      type: String
    },
    /**
     * Value
     */
    value: {
      type: [Number, String]
    },
    /**
     * Variation
     */
    variation: {
      type: String,
      default: "regular",
      validator: value => {
        return value.match(/(regular|danger|warning|secondary|success)/)
      }
    },
    /**
     * Temporary: Enable ghost loading styles
     */
    ghostLoad: {
      type: Boolean,
      default: false
    },
    /**
     * If the stats are being still loaded
     */
    loading: {
      type: Boolean
    },
    /**
     * Small font size of the KPI value
     */
    small: {
      type: Boolean
    },
    /**
     * Enables click event emitting and styling
     */
    clickable: {
      type: Boolean
    },
    /**
     * Enables tag component usage in title field
     */
    tag: {
      type: Boolean,
      default: false
    },
    /**
     * Determine tag variation if `tag` prop is `true`
     */
    tagVariation: {
      type: String,
      default: "default"
    }
  },
  methods: {
    emitClick() {
      this.clickable && this.$emit("click")
    }
  }
}
</script>
