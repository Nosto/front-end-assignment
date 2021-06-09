<template>
  <g class="axis x" :transform="translate(0, height)" text-anchor="middle" v-if="type === 'x'">
    <line v-for="tick in ticks" :x1="scale(tick) + xOffset" :x2="scale(tick) + xOffset" :y1="0" :y2="-height" v-if="tickLines"/>
    <line x1="0" x2="0" y1="0" :y2="-height" v-if="tickLines" class="main"/>
    <g class="texts">
      <g :class="tickClasses[i]" v-for="(tick,i) in ticks" :transform="translate(scale(tick) + xOffset, 0)">
        <line y2="6" v-if="tickMarkers"/>
        <text y="9" dy="0.71em" @click="tickClicked(tick)">{{labelFormat(tick)}}</text>
      </g>
      <text :x="width / 2" y="40" v-if="title" class="title">
        <tspan>{{title}}</tspan>
      </text>
    </g>
  </g>
  <g class="axis y" text-anchor="end" v-else>
    <line v-for="tick in ticks" x1="0" :x2="width" :y1="scale(tick)" :y2="scale(tick)" v-if="tickLines"/>
    <line x1="0" :x2="width" :y1="height" :y2="height" v-if="tickLines" class="main"/>
    <g class="texts">
      <g :class="tickClasses[i]" v-for="(tick, i) in ticks" :transform="translate(0, scale(tick) + yOffset)">
        <line x2="-6" v-if="tickMarkers"/>
        <text x="-9" dy="0.32em" @click="tickClicked(tick)">{{labelFormat(tick)}}</text>
      </g>
      <text x="-48" :y="height / 2" :transform="rotate(270, -48, height / 2)" v-if="title" class="title">
        <tspan>{{title}}</tspan>
      </text>
    </g>
  </g>
</template>

<script>
import { getBBox } from "@/utils/size"
import isNumber from "@/utils/isNumber"
import { formatNumber } from "./utils"

const defaultMinTickSizeX = 48
const defaultMinTickSizeY = 30

/**
 * TODO: This should be replaced with a description of the component.
 */
export default {
  name: "Axis",
  props: {
    type: {
      type: String,
      validator: value => {
        return value.match(/(x|y)/)
      }
    },
    title: {
      type: String
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    xOffset: {
      type: Number,
      default: 0
    },
    yOffset: {
      type: Number,
      default: 0
    },
    scale: {
      type: Function
    },
    tickLines: {
      type: Boolean,
      default: false
    },
    tickMarkers: {
      type: Boolean,
      default: false
    },
    labelFormat: {
      type: Function,
      default: function(v) {
        return isNumber(v) ? formatNumber(v) : v
      }
    }
  },
  data() {
    return {
      minTickSize: defaultMinTickSizeY
    }
  },
  computed: {
    ticks() {
      if (this.scale.ticks) {
        let widthOrHeight = this.type === "x" ? this.width : this.height
        let maxTicks = Math.floor(widthOrHeight / defaultMinTickSizeX)
        return this.scale.ticks(maxTicks, "s")
      } else {
        return this.scale.domain()
      }
    },
    tickClasses() {
      let widthOrHeight = this.type === "x" ? this.width : this.height
      let maxTicks = Math.floor(widthOrHeight / this.minTickSize)
      let maxCharLength = this.ticks.map(t => t.length).reduce((a, b) => (a > b ? a : b), 1)
      let steps = Math.ceil((this.minTickSize / widthOrHeight) * this.ticks.length)
      let visible = this.ticks.filter((a, i) => i % steps === 0)
      if (this.ticks.length < maxTicks) {
        // no limiting
        return this.ticks.map(t => ({ tick: true }))
      } else if (maxCharLength > 2) {
        // rotation and limiting
        return this.ticks.map(t => ({ tick: true, rotate: true, hidden: visible.indexOf(t) === -1 }))
      } else {
        // limiting
        return this.ticks.map(t => ({ tick: true, hidden: visible.indexOf(t) === -1 }))
      }
    }
  },
  methods: {
    translate(...args) {
      return "translate(" + args.join(", ") + ")"
    },
    rotate(...args) {
      return "rotate(" + args.join(" ") + ")"
    },
    tickClicked(tick) {
      this.$emit("tick", tick)
    }
  },
  updated() {
    if (this.type === "x") {
      let texts = Array.from(this.$el.querySelectorAll(".tick text"))
      this.minTickSize = Math.round(
        texts.map(e => getBBox(e).width).reduce((acc, curr) => (acc > curr ? acc : curr), defaultMinTickSizeY)
      )
    } else {
      this.minTickSize = defaultMinTickSizeY
    }
  }
}
</script>

<style lang="scss" scoped>
text {
  font-size: $font-size-xx-small;
  fill: $color-grey-dark;
  &.title {
    fill: black;
    text-anchor: middle;
    text-transform: uppercase;
  }
}
line,
path {
  stroke: $color-grey-light;
  stroke-width: 1px;
  fill: none;
  shape-rendering: crispEdges;
  &.main {
    stroke: $color-grey-dark;
  }
}

.tick {
  &.hidden {
    visibility: hidden;
  }
  &.rotate text {
    transform: rotate(-45deg);
    transform-origin: right;
    transform-box: fill-box;
    text-anchor: end;
  }
  text {
    cursor: pointer;
  }
}
</style>
