<template>
  <router-link v-bind="{activeClass, exactActiveClass, to, disabled, size}" v-if="to">
    <slot>{{localized}}</slot>
  </router-link>
  <a v-bind="{href, target, disabled, download, size}" @click="click" v-else>
    <slot>{{ localized }}</slot>
  </a>
</template>

<script>
import i18n from "../i18n"

/**
 * Use for linking to external documentation or another page. If there is a need for more link in a single view, consider using subtle links to avoid overwhelming the user. If you use `to` attribute, it becomes a RouterLink.
 */
export default {
  name: "TextLink",
  status: "ready",
  props: {
    /**
     * The URL for the link
     */
    href: {
      default: "#",
      required: false
    },
    /**
     * Specifies where to display the linked URL.
     * `_self, _blank, _parent, _top`
     */
    target: {
      type: String,
      default: "_self"
    },
    /**
     * The size of the link
     * `small, base, medium, large`
     */
    size: {
      type: String,
      default: "base",
      validator: value => {
        return value.match(/(small|base|medium|large)/)
      }
    },
    /**
     * Disabled state of the link
     */
    disabled: {
      type: Boolean,
      required: false
    },
    /*
     * Download file when clicking on the link
     */
    download: {
      type: [Boolean, String],
      required: false
    },
    /**
     * Next view for router-link
     */
    to: {
      type: [Object, String],
      required: false
    },
    /**
     * Active class for router-link
     */
    activeClass: {
      type: String
    },
    /**
     * Exact active class for router-link
     */
    exactActiveClass: {
      type: String
    }
  },
  mixins: [i18n],
  methods: {
    click(e) {
      if (this.disabled) {
        return
      }
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
@import "TextLink.scss";
</style>

<docs>
  ```jsx
  <div>
    <panel heading="Link">
      Use <code>to="destination"</code> for router-link<br/><br/>
      <text-link href="https://nosto.com">I am a link</text-link><br/>
      <text-link href="https://nosto.com" subtle>I am subtle</text-link><br/>
    </panel>
    <panel heading="Icon Link">
      <text-link href="https://nosto.com">Download</text-link><br/>
    </panel>
    <panel heading="Disabled Link">
      <text-link href="https://nosto.com" disabled>I am disabled</text-link><br/>
    </panel>
    <panel heading="Small Links">
      When you need 12px links use <code>small</code> attribute.<br/><br/>
      <text-link href="https://nosto.com" size="small">Download</text-link><br/>
      <text-link href="https://nosto.com" size="small">Link</text-link><br/>
    </panel>
  </div>
  ```
</docs>
