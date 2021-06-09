<template>
  <div class="chart-wrapper">
    <div class="loading-text" v-if="loading">
      <slot name="loadingText"/>
    </div>
    <div class="no-data-text" v-if="$slots.noDataText">
      <slot name="noDataText" />
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "ChartWrapper",
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-wrapper {
  position: relative;
}
.loading-text,
.no-data-text {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
  z-index: 1;
}
.loading-text {
  position: absolute;
}
.no-data-text {
  min-height: 300px; // Default height of a chart
}
</style>
