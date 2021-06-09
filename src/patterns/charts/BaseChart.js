import SizeAware from "@/elements/SizeAware"
import deepEqual from "deep-equal"
import { defaultDimensions } from "./utils"
import { getBBox } from "@/utils/size"
import { getModels } from "./chartModels.js"
import isNumber from "@/utils/isNumber"

const defaultMargin = { top: 8, right: 8, bottom: 8, left: 8 }

function getWidth(axis) {
  let texts = axis.$el.querySelector(".texts")
  return getBBox(texts).width
}

function getHeight(axis) {
  let texts = axis.$el.querySelector(".texts")
  return getBBox(texts).height
}

export default {
  props: {
    /**
     * X-axis configuration
     * true/false or { title, labelFormat, tickLines }
     */
    xAxis: {
      type: [Boolean, Object],
      default: true
    },
    /**
     * Y-axis configuration
     * true/false or { title, labelFormat, tickLines }
     */
    yAxis: {
      type: [Boolean, Object],
      default: true
    },
    height: {
      type: Number,
      default: 300
    },
    /**
     * Determines whether the chart loading sequence has been started by external source
     */
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      others: [],
      margin: Object.assign({}, defaultMargin),
      width: defaultDimensions.defaultWidth,
      rectTop: 0,
      rectLeft: 0,
      rectRight: undefined
    }
  },
  mixins: [SizeAware],
  mounted() {
    this.$watch(
      vm => [getModels(vm, this.$options.name)],
      () => {
        if (this.loading) {
          /**
           * If loading flag is present then set a watcher for multiple properties
           * based on chart type and emit chartReady event when new data is available.
           *
           * @event chartReady
           */
          this.$emit("chartReady")
        }
      },
      {
        deep: true
      }
    )
  },
  computed: {
    viewBox() {
      return [0, 0, this.width, this.chartHeight].join(" ")
    },
    chartHeight() {
      return this.height || defaultDimensions.defaultHeight
    }
  },
  methods: {
    resizer() {
      this.width = this.$el.clientWidth
    },
    getMargin() {
      let margin = Object.assign({}, defaultMargin)
      if (this.$refs.yAxis) {
        margin.left += getWidth(this.$refs.yAxis) + 8
      }
      if (this.$refs.xAxis) {
        margin.bottom += getHeight(this.$refs.xAxis)
      }
      return margin
    },
    translate(...args) {
      return "translate(" + args.join(", ") + ")"
    },
    xAccessor(val) {
      if (val && val.hasOwnProperty("x")) {
        return val.x
      } else if (val && Array.isArray(val)) {
        return val[0]
      } else {
        return null
      }
    },
    yAccessor(val) {
      if (val && val.hasOwnProperty("y")) {
        return val.y
      } else if (val && val.hasOwnProperty("value")) {
        return val.value
      } else if (val && Array.isArray(val)) {
        return val[1]
      } else {
        return val
      }
    },
    scaleWithAccessor(scale, axis) {
      let accessor = axis === "x" ? v => (this.xAccessor(v) ? this.xAccessor(v) : this.yAccessor(v)) : this.yAccessor
      let wrapped = val => scale(accessor(val))
      Object.keys(scale).forEach(key => (wrapped[key] = scale[key]))
      return wrapped
    },
    connectTo(chart) {
      this.others.push(chart)
    },
    forCharts(cb) {
      cb(this)
      this.others.forEach(cb)
    },
    color(i) {
      return "color" + (i % 5)
    },
    isValid(data) {
      return this.xAccessor(data)
        ? isNumber(this.xAccessor(data)) && isNumber(this.yAccessor(data))
        : isNumber(this.yAccessor(data))
    },
    getHiddenKeys(series) {
      return series.filter(s => s.hasOwnProperty("visible") && !s.visible).map(s => s.name)
    },
    setTooltipPosition(e) {
      const w = window.innerWidth
      if (e.clientX > w / 2) {
        this.rectLeft = undefined
        this.rectRight = w - e.clientX - 20 + "px"
      } else {
        this.rectLeft = e.clientX - 20 + "px"
        this.rectRight = undefined
      }
      this.rectTop = e.clientY + 50 + "px"
    }
  },
  updated() {
    let margin = this.getMargin()
    if (!deepEqual(this.margin, margin)) {
      this.margin = margin
    }
  }
}
