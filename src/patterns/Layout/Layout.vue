<template>
  <div class="nosto-layout">
    <slot name="navigation" />
    <container :mode="mode">
      <grid class="layout-top" :columns="columns" v-if="$slots.topLeft || $slots.topCenter || $slots.topRight">
        <div v-if="$slots.topLeft">
          <slot name="topLeft"/>
        </div>
        <div v-if="$slots.topCenter" grid-center>
          <slot name="topCenter"/>
        </div>
        <div v-if="$slots.topRight" class="layout-top-right" grid-right>
          <slot name="topRight"/>
        </div>
      </grid>
      <slot/>
    </container>
  </div>
</template>

<script>
/**
 * Top level component for route views to provide consistent content layouts
 *
 * A typical playcart Vue app will have something like
 * ```
 * <page><router-view><layout>content</layout></router-view></page>
 * ```
 */
export default {
  name: "Layout",
  status: "prototype",
  props: {
    mode: {
      type: String,
      default: "default"
    },
    vertical: {
      type: String,
      default: "bottom"
    },
    grow: {
      type: String,
      default: "1"
    }
  },
  computed: {
    columns() {
      return (
        (this.$slots.topLeft ? "auto " : "") +
        (this.$slots.topCenter ? "auto " : "") +
        (this.$slots.topRight ? "auto " : "")
      ).trim()
    }
  }
}
</script>

<style lang="scss">
@import "Layout.scss";
</style>

<docs>
  ```jsx
  <panel heading="Layouts">
    <input-label>Left content</input-label>
    <layout>
      <action-button slot="topLeft">First</action-button>
      Main content
    </layout>
    <layout grow="0">
      <button-group slot="topLeft">
        <action-button>First</action-button>
        <action-button>Second</action-button>
        <action-button>Third</action-button>
        <action-button>Fourth</action-button>
      </button-group>
      Main content
    </layout>
    <input-label>Right content</input-label>
    <layout>
      <action-button slot="topRight">First</action-button>
      Main content
    </layout>
    <layout grow="0">
      <button-group slot="topRight">
        <action-button>First</action-button>
        <action-button>Second</action-button>
        <action-button>Third</action-button>
        <action-button>Fourth</action-button>
      </button-group>
      Main content
    </layout>
    <input-label>Left and right content</input-label>
    <layout>
      <action-button slot="topLeft">First</action-button>
      <action-button slot="topRight">First</action-button>
      Main content
    </layout>
    <layout>
      <button-group slot="topLeft">
        <action-button>First</action-button>
        <action-button>Second</action-button>
      </button-group>
      <button-group slot="topRight">
        <action-button>First</action-button>
        <action-button>Second</action-button>
        <action-button>Third</action-button>
        <action-button>Fourth</action-button>
      </button-group>
      Main content
    </layout>
  </panel>
  ```
</docs>
