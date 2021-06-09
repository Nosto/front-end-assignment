<template>
  <div :class="['stack', direction]" :style="{justifyContent, alignItems}">
    <slot/>
  </div>
</template>

<script>
/**
 * Use Stacks to layout components horizontally or vertically
 */
export default {
  name: "Stack",
  props: {
    /**
     * Direction of the Stack
     * `horizontal, vertical`
     */
    direction: {
      type: String,
      default: "horizontal"
    },
    /**
     * justify-content CSS style
     * https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
     */
    justifyContent: {
      type: String
    },
    /**
     * align-items CSS style
     * https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
     */
    alignItems: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import "Stack.scss";
</style>
