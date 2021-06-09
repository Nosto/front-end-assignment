<template>
  <div class="container" :class="{'loading-chart palette-grey-scale': loading, 'palette-5-down': !loading}">
    <heading level="h3" v-if="heading">{{heading}}</heading>
    <input-label v-if="subheading">{{subheading}}</input-label>
    <svg v-bind="{width, height, viewBox}" @mousemove="onMouseMove" @mouseout="onMouseOut" @mouseover="onMouseOver">
      <g :transform="translate(margin.left, margin.top)">
        <!-- x-axis -->
        <axis type="x" :width="innerWidth" :height="innerHeight"
              :title="xAxis.title" :label-format="xAxis.labelFormat"
              :x-offset="(hasCategories ? x0.bandwidth() / 2 : 0) + 0.5"
              :scale="x0"
              :tick-lines="xAxis.tickLines" ref="xAxis" v-if="xAxis"/>

        <!-- y-axis -->
        <axis type="y" :width="innerWidth" :height="innerHeight"
              :title="yAxis.title" :label-format="yAxis.labelFormat"
              :y-offset="0.5"
              :scale="y"
              :tick-lines="yAxis.tickLines !== false"
              ref="yAxis" v-if="yAxis"/>

        <!-- lines -->
        <g class="lines">
          <path v-for="(path, j) in paths" :d="path.path"
                :class="{[color(j)]: true, opaque: keyHovered && keyHovered !== path.serie}"
                v-show="!isHiddenSerie(path.serie)" :style="path.styles"/>
        </g>

        <!-- dots -->
        <g class="dots">
          <circle v-for="dot in dots" :r="!isHiddenSerie(dot.serie) ? 3 : 0"
                  :class="['dot', {[color(dot.j)]: true, active: isActiveDot(dot.serie, dot.i), opaque: keyHovered && keyHovered !== dot.serie}]"
                  :cx="dot.x" :cy="dot.y"
                  :style="{color: series[dot.j].styles && series[dot.j].styles.color}"/>
        </g>
      </g>
    </svg>

    <!-- legend -->
    <chart-legend :items="legends" :hidden-keys="hiddenKeys" @over="legendover" @out="legendout" @hiddenKeys="toggleHiddenKeys" v-if="legend"/>

    <!-- tooltip -->
    <chart-tooltip v-show="dotHovered && activeDot" v-bind="{rows:tooltipRows, top:rectTop, left:rectLeft, right:rectRight}" ref="chartTooltip">
      <slot name="tooltip" v-bind="{rows:tooltipRows}"/>
    </chart-tooltip>
  </div>
</template>

<script>
import { withPalette } from "./utils"
import BaseChart from "./BaseChart"
import d3 from "./d3importer"
import KDTree from "@/utils/kdTree"
import isEqual from "lodash/isEqual"

/**
 * TODO: This should be replaced with a description of the component.
 */
export default {
  name: "LineChart",
  status: "prototype",
  mixins: [BaseChart],
  props: {
    /**
     * The heading for the line chart.
     */
    heading: {
      type: String,
      required: false
    },
    /**
     * The subheading for the line chart.
     */
    subheading: {
      type: String,
      required: false
    },
    /**
     * The categories for the line chart.
     * `['UK', 'US', 'Germany', 'France']`
     */
    categories: {
      type: Array,
      required: false
    },
    /**
     * The series for the line chart.
     * `[{ name: 'UK', data: [70000, 69000, 95000] }, tooltip: { valueDecimals: 6 }, … }]`
     * Supported data format.
     * `[ [1,2], [2,3], [3,4] ]`
     * `[ {x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4} ]`
     * `[ {y: 2}, {y: 3}, {y: 4} ]`
     * `[ {value: 2}, {value: 3}, {value: 4} ]`
     */
    series: {
      type: Array,
      required: true
    },
    /**
     * Display legend
     */
    legend: {
      type: Boolean,
      default: true
    },
    /**
     * A string to prepend to each series' y value. Overridable in each series' tooltip options object.
     */
    valuePrefix: {
      type: String,
      required: false
    },
    /**
     * A string to append to each series' y value. Overridable in each series' tooltip options object.
     */
    valueSuffix: {
      type: String,
      required: false
    },
    /**
     * How many decimals to show in each series' y value. This is overridable in each series' tooltip options object. The default is to preserve all decimals.
     */
    valueDecimals: {
      type: Number,
      default: 0
    },
    /**
     * Whether tooltip is shared between lines
     */
    sharedTooltip: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.$el.className = withPalette(this.$el.className, this.loading ? "palette-grey-scale" : "palette-5-down")
  },
  data() {
    return {
      keyHovered: undefined,
      activeDot: undefined,
      dotHovered: false,
      hiddenKeys: this.getHiddenKeys(this.series),
      noData: false
    }
  },
  computed: {
    visibleSeries() {
      return this.series.filter(s => !this.isHiddenSerie(s.name))
    },
    hasCategories() {
      return !!this.categories
    },
    shared() {
      return this.hasCategories && this.sharedTooltip
    },
    keys() {
      return this.visibleSeries.map(s => s.name)
    },
    innerWidth() {
      return this.width - this.margin.left - this.margin.right
    },
    innerHeight() {
      return this.height - this.margin.top - this.margin.bottom
    },
    paths() {
      let { x0, y, series } = this
      let line = d3
        .line()
        .defined(d => this.isValid(d))
        .x((v, i) => (this.hasCategories ? x0(this.categories[i]) + x0.bandwidth() / 2 : x0(this.xAccessor(v))))
        .y(v => y(this.yAccessor(v)))
      return series.map(serie => {
        return { serie: serie.name, path: line(serie.data), styles: serie.styles }
      })
    },
    tooltipRows() {
      if (!this.activeDot) {
        return
      }
      const idx = this.activeDot.i
      const row = serie => ({
        serie: serie.name,
        category: this.categoriesForChart(serie)[idx],
        data: serie.data[idx],
        tooltip: serie.tooltip
      })
      const activeSerie = this.visibleSeries.filter(s => s.name === this.activeDot.serie)[0]
      return this.shared ? this.visibleSeries.map(serie => row(serie)) : [row(activeSerie)]
    },
    x0() {
      if (this.hasCategories) {
        let x0 = d3.scaleBand().rangeRound([0, this.innerWidth])
        x0.domain(this.categories)
        return x0
      } else {
        let x0 = d3.scaleLinear().rangeRound([0, this.innerWidth])
        let min = d3.min(this.visibleSeries, s => d3.min(s.data, this.xAccessor))
        let max = d3.max(this.visibleSeries, s => d3.max(s.data, this.xAccessor))
        x0.domain([min, max])
        return this.scaleWithAccessor(x0, "x")
      }
    },
    x1() {
      if (this.hasCategories) {
        let x1 = d3.scaleBand()
        x1.domain(this.keys).rangeRound([0, this.x0.bandwidth()])
        return x1
      }
    },
    y() {
      let y = d3.scaleLinear().rangeRound([this.innerHeight, 0])
      y.domain([0, d3.max(this.visibleSeries, s => d3.max(s.data, this.yAccessor))]).nice()
      return this.scaleWithAccessor(y, "y")
    },
    legends() {
      return this.series.map(s => {
        return {
          name: s.name,
          visible: s.hasOwnProperty("showInLegend") ? s.showInLegend : true,
          color: s.styles && s.styles.color
        }
      })
    },
    dots() {
      let points = []
      for (let i = 0; i < this.visibleSeries.length; i++) {
        let serieData = this.visibleSeries[i].data
        for (let j = 0; j < serieData.length; j++) {
          let d = serieData[j]
          if (this.isValid(d)) {
            points.push({
              x: this.hasCategories
                ? this.x0(this.categories[j]) + this.x0.bandwidth() / 2
                : this.x0(this.xAccessor(d)),
              y: this.y(this.yAccessor(d)),
              serie: this.visibleSeries[i].name,
              i: j,
              j: this.series.indexOf(this.visibleSeries[i])
            })
          }
        }
      }
      return points
    },
    tree() {
      return this.dots.length && KDTree(this.dots, this.shared)
    }
  },
  methods: {
    onMouseOver() {
      this.dotHovered = true
    },
    onMouseMove(e) {
      const cursorPoint = [e.offsetX - this.margin.left, e.offsetY - this.margin.top]
      const nearest = this.tree && this.tree.find(cursorPoint)
      this.activeDot = this.dots.filter(d => isEqual(nearest.node.location, [d.x, d.y]))[0]
      this.setTooltipPosition(e)
    },
    onMouseOut() {
      this.activeDot = null
      this.dotHovered = false
    },
    legendover(key) {
      this.forCharts(c => (c.keyHovered = key))
    },
    legendout() {
      this.forCharts(c => (c.keyHovered = null))
    },
    toggleHiddenKeys(keys) {
      this.forCharts(c => (c.hiddenKeys = keys))
    },
    isHiddenSerie(name) {
      return this.hiddenKeys.indexOf(name) > -1
    },
    categoriesForChart(serie) {
      return this.categories || serie.data
    },
    isActiveDot(name, i) {
      if (!this.activeDot) return false
      let serie = this.series.filter(s => s.name === name)[0]
      if (this.shared) {
        return this.activeDot.i === i
      } else {
        let xPos = this.hasCategories
          ? this.x0(this.categories[i]) + this.x0.bandwidth() / 2
          : this.x0(this.xAccessor(serie.data[i]))
        let yPos = this.y(this.yAccessor(serie.data[i]))
        return this.activeDot.x === xPos && this.activeDot.y === yPos
      }
    }
  },
  watch: {
    series(nV) {
      this.hiddenKeys = this.getHiddenKeys(nV)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./Chart";
</style>

<docs>
  ```js
  new Vue({
    data () {
      return {
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        series: [
         {name: 'UK', data: [70000, 69000, null, 145000, 182000, 215000, 252000, 265000, 233000, 183000, 139000, 96000]},
         {name: 'US', data: [0, 8000, 57000, 113000, 170000, 220000, 248000, 241000, 201000, 141000, 86000, 25000]},
         {name: 'Germany', data: [9000, 0, 35000, 84000, 135000, 170000, 186000, 179000, 143000, 90000, 39000, 10000]},
         {name: 'France', data: [39000, 42000, null, 85000, 119000, 152000, 170000, 166000, 142000, 103000, 66000, 48000]}
        ],
        series2: [
         {name: 'UK', data: [[1, 70000], [2, 69000], [null, null], [4, 145000], [5, 182000], [6, 215000], [7, 252000], [8, 265000], [9, 233000], [10, 183000], [11, 139000], [12, 96000]]},
         {name: 'US', data: [[0, 2000], [1.4, 8000], [2.4, 57000], [3.5, 113000], [4.6, 170000], [5.7, 220000], [6.2, 248000], [7.8, 241000], [8.3, 201000], [9.5, 141000], [10.2, 86000], [11.1, 25000]]},
        ],
        categories3: [],
        series3: [{
          data: [[]]
        }],
        series4: [{
          data: [[]]
        }],
        loading: true
      }
     },
     mounted() {
       this.$refs.first.connectTo(this.$refs.second)
       if (this.loading) {
         setTimeout(() => {
          this.series4 = this.series2
         }, 2500)
       }
       this.finishLoading()
     },
     methods: {
       finishLoading() {
         setTimeout(() => {
           this.loading = false
         }, 5000)
       }
     },
     watch: {
       loading(nV) {
         if (nV) {
           this.finishLoading()
         }
       }
     },
  template: `
  <panel heading="Line chart">
    <line-chart
            ref="first"
            heading="Sales"
            subheading="by country"
            y-axis-title="Sales (€)"
            :categories="categories"
            :series="series"/>

    <line-chart
            ref="second"
            :legend="false"
            heading="Custom tooltip"
            y-axis-title="Sales (€)"
            :categories="categories"
            :series="series">
      <div slot="tooltip" slot-scope="{rows}">
        <div v-for="{serie, data, tooltip} in rows">
          {{serie}} {{data}}
        </div>
      </div>
    </line-chart>
    
    <line-chart heading="Without categories" :series="series2" :shared-tooltip="false"/>
    
    <heading level="h3">Without data</heading>
    <chart-wrapper v-bind="{loading}">
      <div slot="noDataText" v-if="!!series3">No data available.</div>
      <line-chart heading="Without data" :series="series3" :shared-tooltip="false" :legend="!!series3[0].data[0].length" :y-axis="!!series3[0].data[0].length" v-if="series3[0].data[0].length"/>
    </chart-wrapper>

    <heading level="h3">Loading state</heading>
    <action-button :disabled="loading" @click="loading = true">Retry loading</action-button>
    <chart-wrapper v-bind="{loading}">
      <div slot="loadingText" v-if="loading"><heading level="h3">{{ $i18n("loading") }}</heading></div>
      <line-chart :series="series4" v-bind="{loading}" ref="LineChart"/>
    </chart-wrapper>
  </panel>
  `
  })
  ```
</docs>
