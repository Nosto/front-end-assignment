<template>
  <div class="tooltip" :style="{top, left, right}">
    <slot>
      <template v-if="data">
        <span class="name">{{data.serie}}</span>
        <span class="value">{{displayValue(data.data, data.tooltip)}}</span>
      </template>
      <div v-for="{serie, data, tooltip} in rows" class="serie" v-if="rows.length && isValid(data)">
        <span class="name">{{serie}}</span>
        <span class="value">{{displayValue(data, tooltip)}}</span>
      </div>
      <div v-if="content" class="content">
        <span>{{content}}</span>
      </div>
    </slot>
  </div>
</template>

<script>
import isNumber from "@/utils/isNumber"

/**
 * TODO: This should be replaced with a description of the component.
 */
export default {
  name: "ChartTooltip",
  props: {
    data: {
      type: [Object, Array]
    },
    rows: {
      type: Array
    },
    content: {
      type: String
    },
    top: {
      type: [Number, String]
    },
    left: {
      type: [Number, String]
    },
    right: {
      type: [Number, String]
    }
  },
  methods: {
    displayValue(val, tooltip) {
      let decimals = tooltip && isNumber(tooltip.valueDecimals) ? tooltip.valueDecimals : 2,
        toFixedNum = v => +v.toFixed(decimals),
        format = toFixedNum

      if (tooltip) {
        if (tooltip.format) {
          format = v => tooltip.format(toFixedNum(v))
        } else if (tooltip.valueSuffix) {
          format = v => toFixedNum(v) + tooltip.valueSuffix
        }
      }

      if (this.isValid(val)) {
        if (val.hasOwnProperty("value") && val.hasOwnProperty("y")) {
          return `${format(val.value)} (${toFixedNum(val.y)}%)`
        } else if (val.hasOwnProperty("value")) {
          return format(val.value)
        } else if (val.hasOwnProperty("x") && val.hasOwnProperty("y")) {
          return `x: ${toFixedNum(val.x)}, y: ${toFixedNum(val.y)}`
        } else if (Array.isArray(val)) {
          return `x: ${toFixedNum(val[0])}, y: ${toFixedNum(val[1])}`
        } else if (val.hasOwnProperty("y")) {
          return toFixedNum(val.y)
        }
        return format(val)
      }
    },
    isValid(data) {
      if (data && (data.hasOwnProperty("value") || data.hasOwnProperty("y"))) {
        return isNumber(data.value) || isNumber(data.y)
      }
      if (Array.isArray(data)) {
        return isNumber(data[0]) && isNumber(data[1])
      }
      return isNumber(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip {
  position: fixed;
  background: $color-white;
  padding: $space-xxx-small $space-xx-small;
  border: 1px solid $color-grey-light;
  border-radius: $border-radius-small;
  font-size: $font-size-x-small;
  font-family: $font-family-primary-screen-smart;
  transition: all 0s ease-in;
  line-height: $line-height-medium;
  z-index: $z-index-tooltip;
  .serie:after {
    content: "";
    display: block;
    clear: both;
  }
  .name {
    float: left;
    padding-right: $space-xx-small;
    text-transform: capitalize;
  }
  .value {
    float: right;
    padding-left: $space-xx-small;
    font-weight: $font-weight-bold;
  }
  .content {
    max-width: $width-chart-tooltip;
  }
}
</style>
