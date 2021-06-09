<template>
  <component :class="['tag', variation]" :is="type" @click="click" v-bind="{ opaque, circle, slim }">
    <slot>{{ localized }}</slot>
  </component>
</template>

<script>
import i18n from "../i18n"

/**
 * A Tag is an inline attachment that helps label, organize, and categorize objects. Primary usage is to communicate metadata. We have three types of tags.
 */
export default {
  name: "Tag",
  status: "ready",
  props: {
    /**
     * The html element name used for the tag
     */
    type: {
      type: String,
      default: "div"
    },
    /**
     * Style variation to give additional meaning.
     * `default, violet, blue, teal, red, green, orange, yellow`
     */
    variation: {
      type: String,
      default: "default"
    },
    /**
     * Apply when you want a circled tag
     */
    circle: {
      type: Boolean,
      default: false
    },
    /**
     * Apply when you want an opaque color
     */
    opaque: {
      type: Boolean,
      default: false
    },
    /**
     * Apply when you want slimmer tag.
     * Effectively reduces padding and line-height.
     */
    slim: {
      type: Boolean,
      default: false
    }
  },
  mixins: [i18n],
  methods: {
    click(e) {
      /**
       * Click event.
       *
       * @event click
       */
      this.$emit("click", e)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "Tag.scss";
</style>

<docs>
  ```jsx
  <div>
    <panel heading="Simple Tag">
      A tag with static text can be used as a flag or as a reference to an object or attribute.
      <br><br>
      <tag icon="price">Archived</tag>
      <tag variation="orange">Paused</tag>
    </panel>
     <panel heading="Slim Tags">
      <tag icon="price" slim>Archived</tag>
      <tag variation="orange" slim>Paused</tag>
    </panel>
  </div>
  ```
</docs>
