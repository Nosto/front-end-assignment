<template>
  <div class="tab-wrapper">
    <span>
      <text-link v-bind="{to: route, disabled, activeClass, exactActiveClass}"
                 v-for="(route, idx) in routes" :key="idx">{{ route.meta.title }}</text-link>
    </span>
    <div class="right-content">
      <slot name="nav-tabs-right"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavigationalTabs",
  props: {
    routes: {
      type: Array
    },
    disabled: {
      type: Boolean,
      default: false
    },
    activeClass: {
      type: String
    },
    exactActiveClass: {
      type: String,
      default: "active"
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../Tabs/Tabs.scss";
@import "NavigationalTabs.scss";
</style>

<docs>
```jsx
  <panel heading="Navigational Tab">
    For fully functional example a project needs a Vue Router to see it in action.
    It is possible to put UI controls to the right side using named slot within the <b>Page</b> component <code>nav-tabs-right</code>.
  </panel>
```
</docs>
