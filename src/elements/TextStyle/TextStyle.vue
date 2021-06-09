<template>
  <component :is="type" :class="['text ', variation]">
    <slot>{{ localized }}</slot>
  </component>
</template>

<script>
import i18n from "../i18n"

/**
 * TODO: This should be replaced with a description of the component.
 */
export default {
  name: "TextStyle",
  status: "prototype",
  props: {
    /**
     * The html element name used for the text
     */
    type: {
      type: String,
      default: "span"
    },
    /**
     * Style variation to give additional meaning.
     * `default, disabled, strong, positive, negative, small, tiny`
     */
    variation: {
      type: String,
      default: "default"
    }
  },
  mixins: [i18n]
}
</script>

<style lang="scss" scoped>
@import "TextStyle.scss";
</style>


<docs>
  ```jsx
  <panel heading="Text style large">
    <text-style variation="default">Design isn’t just about the look and feel. Design is how it works, and we believe the best way to focus on this is to work as close to the end result as possible. That’s why we start all our projects with simple sketches, and quickly transition into designing working prototypes in code. This is done by the same designers who started the work, which ensures that our original design intent is carried all the way to the end product.</text-style>
    <text-style variation="tiny">This is using tiny text variation.</text-style>
  </panel>
  ```
</docs>
