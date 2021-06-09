<template>
  <div>
    <div class="tab-wrapper" :variation="variation">
      <span v-for="(tab, idx) in tabs" @click="setActive(idx)" :class="{active: active === idx}">{{ tab.title }}
        <svg-icon v-if="tab.svgIcon" v-bind="tab.svgIcon" />
      </span>
    </div>
    <div class="tab-content-wrapper">
      <slot/>
    </div>
  </div>
</template>

<script>
/**
 * Tabs are a navigation element that allows users to easily access different areas of a site or different parts of an individual page.
 */
export default {
  name: "Tabs",
  status: "prototype",
  props: {
    /**
     * The style variation of the tab.
     * `underline, arrow, plain`
     */
    variation: {
      type: String,
      default: "plain",
      validator: value => {
        return value.match(/(underline|arrow|plain)/)
      }
    }
  },
  data() {
    return {
      active: 0,
      tabs: []
    }
  },
  content: ["Tab"],
  methods: {
    setActive(idx) {
      if (idx !== this.active) {
        this.tabs[this.active].visible = false
        this.tabs[idx].visible = true
        this.active = idx
        /**
         * Change event.
         *
         * @event change
         * @type {Object}
         */
        this.$emit("change", idx)
      }
    },
    setTabs() {
      this.tabs = this.$slots.default.filter(comp => comp.componentOptions).map(comp => comp.componentInstance)
    }
  },
  mounted() {
    this.setTabs()
    this.tabs[0].visible = true
    this.$on("changed", () => this.setTabs())
  }
}
</script>

<style lang="scss" scoped>
@import "Tabs.scss";
</style>

<docs>
  ```jsx
  <panel>
    <tabs variation="underline">
      <tab title="First tab" icon="lock-alt">First tab content</tab>
      <tab title="Second tab">Second tab content</tab>
      <tab title="Third tab">Third tab content</tab>
      <tab title="Fourth tab">Fourth tab content</tab>
      <tab title="Fifth tab">Fifth tab content</tab>
      <tab title="Sixth tab">Sixth tab content</tab>
      <tab title="Seventh tab">Seventh tab content</tab>
      <tab title="Eighth tab">Eighth tab content</tab>
      <tab title="Ninth tab">Ninth tab content</tab>
      <tab title="Tenth tab">Tenth tab content</tab>
    </tabs>
  </panel>
    ```
</docs>
