<template>
  <component :is="level" :class="['heading ', variation]">
    <slot>{{ localized }}</slot>
  </component>
</template>

<script>
import i18n from "../i18n"

/**
 * TODO: This should be replaced with a description of the component.
 */
export default {
  name: "Heading",
  status: "prototype",
  props: {
    /**
     * The heading level used for the heading.
     * `h1, h2, h3, h4, h5, h6`
     */
    level: {
      type: String,
      default: "h1"
    },
    /**
     * Style variation to give additional meaning.
     * `default, magenta`
     */
    variation: {
      type: String,
      default: "default",
      validator: value => {
        return value.match(/(default|magenta|subTitle)/)
      }
    }
  },
  mixins: [i18n]
}
</script>

<style lang="scss" scoped>
@import "Heading.scss";
</style>

<docs>
  ```jsx
  <panel heading="Product Headings">
    <heading level="h1">Heading 1</heading>
    <heading level="h2">Heading 2</heading>
    <heading level="h3">Heading 3</heading>
    <br/>
    <hr/>
    <br/>
    <heading level="h1" variation="subTitle">Subtitle heading</heading>
  </panel>
  ```
</docs>
