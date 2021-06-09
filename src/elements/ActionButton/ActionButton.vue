<template>
  <component
    :is="effectiveType"
    class="action-button"
    :class="{expand: width === 'expand'}"
    @click="click"
    v-bind="effectiveProps">
    <div style="display: flex;">
      <span v-if="this.$slots.default || localized">
        <slot>{{ localized }}</slot>
      </span>
    </div>
  </component>
</template>

<script>
import i18n from "../i18n"

export default {
  name: "ActionButton",
  status: "ready",
  props: {
    /**
     * The size of the button.
     * `small, base`
     */
    size: {
      type: String,
      default: "base",
      validator: value => {
        return value.match(/(small|base)/)
      }
    },
    /**
     * The style variation of the button.
     * `default, primary, plain, danger, success, more, secondary, link`
     */
    variation: {
      type: String,
      default: "default",
      validator: value => {
        return value.match(/(default|primary|plain|danger|success|more|secondary|link|list)/)
      }
    },
    /**
     * Type of the element
     */
    type: {
      type: String
    },
    /**
     * Router target to navigate to.
     * `{name: 'example'}`
     */
    to: {
      required: false,
      type: Object
    },
    /**
     * Link location
     */
    href: {
      type: String
    },
    /**
     * Link target
     */
    target: {
      type: String
    },
    /**
     * The width of the button.
     * `auto, expand`
     */
    width: {
      type: String,
      default: "auto",
      validator: value => {
        return value.match(/(auto|expand)/)
      }
    },
    /**
     * The type of the button.
     * `button, submit, reset`
     */
    submit: {
      type: String,
      default: null,
      required: false,
      validator: value => {
        return value.match(/(button|submit|reset)/)
      }
    },
    /**
     * Whether the action button is disabled or not.
     */
    disabled: {
      type: Boolean,
      default: false
    },
  },
  mixins: [i18n],
  computed: {
    effectiveType() {
      if (this.type) {
        return this.type
      } else if (this.to) {
        return this.disabled ? "button" : "router-link"
      } else if (this.href) {
        return "a"
      } else {
        return "button"
      }
    },
    effectiveProps() {
      let { size, submit, variation, disabled, href, target, to } = this
      switch (this.effectiveType) {
        case "router-link":
          return { size, variation, disabled, to }
        case "a":
          return { size, variation, disabled, href, target }
        case "button":
          return { size, variation, disabled, type: submit }
        default:
          return { size, variation, disabled }
      }
    }
  },
  methods: {
    click(e) {
      if (this.disabled) {
        e.preventDefault()
      } else {
        /**
         * Click event.
         *
         * @event click
         */
        this.$emit("click", e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./ActionButton.scss";
</style>
