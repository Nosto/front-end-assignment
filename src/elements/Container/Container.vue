<template>
  <component :is="type" :class="['container', paddingDirection]" :style="{textAlign: align, width}">
    <slot>{{ localized }}</slot>
  </component>
</template>

<script>
import i18n from "./../i18n"

export default {
  name: "Container",
  status: "prototype",
  props: {
    /**
     * The width for the container
     */
    width: {
      type: String,
      default: "100%"
    },
    /**
     * The html element name used for the container
     */
    type: {
      type: String,
      default: "div"
    },
    /**
     * Horizontal alignment (text-align) of content within container.
     */
    align: {
      type: String,
      default: "left"
    },
    /**
     * Set padding for only one axis
     */
    paddingDirection: {
      type: String,
      validator: value => {
        return value.match(/(horizontal|vertical)/)
      }
    }
  },
  mixins: [i18n]
}
</script>

<style lang="scss" scoped>
@import "Container.scss";
</style>
