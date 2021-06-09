<template>
  <component :is="type" :class="{plain, inline}">
    <slot/>
  </component>
</template>

<script>
export default {
  name: "List",
  status: "prototype",
  props: {
    /**
     * Element type of the list
     */
    type: {
      type: String,
      default: "ul"
    },
    /**
     * Use plain list rendering
     */
    plain: {
      type: Boolean,
      default: false
    },
    /**
     * Use inline list rendering
     */
    inline: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "List.scss";
</style>
