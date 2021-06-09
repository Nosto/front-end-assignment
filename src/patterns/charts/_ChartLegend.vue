<template>
  <div :class="{legend: true, narrow, longNames}">
    <div
      :class="{'legend-item': true, dim: isDisabled(toKey(item))}"
      v-for="(item, i) in items"
      @mouseover="legendover(toKey(item))"
      @mouseout="legendout"
      @click="toggle(toKey(item))"
      v-if="item.visible">
      <span class="content">
        <span :class="['rect',color(i)]" :style="{color: item.color}"/>
        {{toKey(item)}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChartLegend",
  props: {
    items: {
      type: Array
    },
    hiddenKeys: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      legendHovered: false,
      narrow: false
    }
  },
  computed: {
    longNames() {
      return this.items.some(i => i.name && i.name.length > 10)
    },
    isDisabled() {
      return key => this.hiddenKeys.indexOf(key) > -1
    }
  },
  methods: {
    color(i) {
      return "color" + (i % 5)
    },
    toKey(item) {
      return (item && item.name) || item
    },
    legendover(key) {
      if (this.isDisabled(key)) return
      this.legendHovered = true
      this.$emit("over", key)
    },
    legendout() {
      this.legendHovered = false
      this.$emit("out")
    },
    toggle(key) {
      const keys = this.hiddenKeys.slice()
      const idx = keys.indexOf(key)
      if (idx > -1) {
        keys.splice(idx, 1)
      } else {
        keys.push(key)
      }
      this.$emit("hiddenKeys", keys)
    },
    resizer() {
      let items = Array.from(this.$el.querySelectorAll(".content"))
      let itemsWidth = items.map(e => e.offsetWidth).reduce((a, b) => a + b, 0)
      this.narrow = itemsWidth > this.$el.offsetWidth
    }
  },
  mounted() {
    this.resizer()
    window.addEventListener("resize", this.resizer)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizer)
  }
}
</script>

<style lang="scss" scoped>
.legend {
  text-align: center;
  margin: $space-x-small auto;

  &.narrow {
    display: flex;
    flex-wrap: wrap;
    .legend-item {
      width: 50%;
      text-align: left;
    }

    &.longNames {
      .legend-item {
        width: 100%;
      }
    }
  }
}

.legend-item {
  display: inline-block;
  font-size: $font-size-x-small;
  font-weight: $font-weight-medium;
  line-height: 1;
  color: $color-grey-darker;
  cursor: pointer;
  text-transform: capitalize;
  transition: opacity $duration-quickly ease-in;

  .content {
    display: inline-block;
    padding: 0 $space-xx-small $space-xx-small 0;
  }

  &.dim {
    opacity: $opacity-opaque;
  }

  .rect {
    display: inline-block;
    width: $font-size-small;
    height: $font-size-small;
    border-radius: $border-radius-small;
    margin: 0 2px -2px 0;
    background: currentColor;
  }
}
</style>
