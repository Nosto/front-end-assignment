<template>
  <div ref="wrapper" class="root" @mouseover="mouseover" @mouseleave="mouseleave" >
    <span @click="toggle">
      <slot name="toggle">
        <action-button
          v-bind="{ variation: toggleVariation, icon: toggleIcon, disabled }"
          v-if="toggleText"
          icon-right
          >{{ toggleText }}</action-button
        >
      </slot>
    </span>
    <div class="wrapper">
      <transition name="fade-in">
        <div
          class="overlay"
          v-if="useVshow || (shown && !hideOverlay)"
          v-show="!useVshow || (shown && !hideOverlay)"
          :style="styles"
          ref="overlay"
        >
          <heading v-if="headingText" level="h4">
            {{ headingText }}
          </heading>
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import isUndefined from "@/utils/isUndefined"

export default {
  name: "Overlay",
  status: "ready",
  props: {
    /**
     * Initial state of show or hide
     */
    shownAtStart: {
      type: Boolean,
      default: false
    },
    /**
     * Text to be used for overlay heading
     */
    headingText: {
      type: String
    },
    /**
     * Text to be used for embedded toggle button
     */
    toggleText: {
      type: String
    },
    /**
     * The variation for button showing the overlay.
     */
    toggleVariation: {
      type: String,
      default: "link"
    },
    /**
     * The icon for button showing the overlay.
     */
    toggleIcon: {
      type: [String, Object],
      default() {
        return { name: "caret-down", solid: true }
      }
    },
    /**
     * The width of the overlay in pixels.
     */
    width: {
      type: [Number, String],
      default: "auto"
    },
    /**
     * The maximum width of the overlay in pixels.
     */
    maxWidth: {
      type: [Number, String],
      default: "auto"
    },
    /**
     * Absolute position of the overlay in pixels.
     */
    position: {
      type: Object,
      default() {
        return {
          left: undefined,
          right: undefined,
          top: undefined,
          bottom: undefined
        }
      }
    },
    /**
     * Use hover instead of click for toggling
     */
    hover: {
      type: Boolean,
      default: false
    },
    /**
     * Set padding to the overlay
     */
    padding: {
      type: [Number, String],
      required: false
    },
    center: {
      type: Boolean,
      default: false
    },
    /**
     * Decide whether to hide overlay content
     */
    hideOverlay: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the overlay is disabled or not.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Define placement for Popover
     */
    placement: {
      type: String,
      default: "bottom"
    },
    /**
     * Define offset for Popover
     */
    offset: {
      type: [String, Number],
      default: 0
    },
    /**
     * Track modal state for mouseleave cases
     */
    modalOpen: {
      type: Boolean,
      default: false
    },
    /**
     * Close on background click
     */
    closeOnBackgroundClick: {
      type: Boolean,
      default: true
    },
    /**
     * Prevent destroying Overlay from DOM when hidden
     * If true, element will be rendered in v-if condition but hidden.
     * Rest of show mechanism will be determined with this.shown && !this.hideOverlay.
     * This support is for situations where v-show is preferred over v-if.
     */
    useVshow: {
      type: Boolean,
      default: false
    },
    /**
     * Make popover unique to prevent multiple popovers to be active.
     * Use same value for multiple popovers if multiple popovers are required to be active.
     */
    openGroup: {
      type: String
    },
    /**
     * Handle multiple toggles use same wrapper element e.g. in OverlayCell.
     * When true, user will be able to open content to same Overlay without toggling the Overlay.
     * When false, a click of sibling Overlay toggle will close the currently open Overlay first before another can be opened.
     */
    multipleToggles: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      shown: this.shownAtStart
    }
  },
  computed: {
    styles() {
      return {
        width: this.width ? this.width + "px" : "auto",
        maxWidth: this.maxWidth ? this.maxWidth + "px" : "none",
        left: isUndefined(this.position.left) ? "auto" : this.position.left + "px",
        right: isUndefined(this.position.right) ? "auto" : this.position.right + "px",
        top: isUndefined(this.position.top) ? "auto" : this.position.top + "px",
        bottom: isUndefined(this.position.bottom) ? "auto" : this.position.bottom + "px",
        padding: this.padding ? this.padding + "px" : null,
        margin: this.center ? "0 auto" : null
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener("click", this.documentClick)
  },
  methods: {
    toggle() {
      if (this.disabled) {
        return
      }
      if (this.multipleToggles) {
        this.show()
      } else {
        !this.hover && (this.shown ? this.hide() : this.show())
      }
      /**
       * Toggle event.
       *
       * @event toggle
       *
       */
      this.$emit("toggle", this.shown)
    },
    mouseover() {
      this.hover && !this.disabled && this.show()
    },
    mouseleave() {
      this.hover && !this.disabled && !this.modalOpen && this.hide()
    },
    displayPopup() {
      this.$refs.wrapper.$refs.popover.style.display = this.shown ? "block" : "none"
    },
    show() {
      this.shown = true
      this.hover && this.popover && this.displayPopup()
      !this.hover && document.addEventListener("click", this.documentClick)
      /**
       * Shown event.
       *
       * @event shown
       * @type {Object}
       */
      this.$emit("shown")
    },
    hide() {
      this.shown = false
      this.hover && this.popover && this.displayPopup()
      !this.hover && document.removeEventListener("click", this.documentClick)
      /**
       * Hidden event.
       *
       * @event hidden
       * @type {Object}
       */
      this.$emit("hidden")
    },
    documentClick(e) {
      const triggerEl = this.$refs.wrapper,
        target = e.target
      if (triggerEl !== target && !triggerEl.contains(target) && this.closeOnBackgroundClick) {
        this.hide()
        this.$emit("toggle", false)
      }
    },
    handlePopover(e) {
      const triggerEl = this.$refs.wrapper.$el,
        popoverEl = this.$refs.wrapper.$refs.popover.firstChild,
        popoverChildren = Array.from(popoverEl.children),
        srcElementList = el => {
          return e.srcElement.getElementsByClassName(el.classList).length
        },
        matchingEl = el => {
          return el === popoverEl || popoverChildren.includes(el)
        }
      if (!srcElementList(triggerEl) || !matchingEl(e.toElement)) {
        this.hide()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "Overlay.scss";
</style>