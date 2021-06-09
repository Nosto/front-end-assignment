<template>
  <div :class="['root', {showToggle}]">
    <transition name="modal">
      <div class="modal-wrapper" v-show="showModal">
        <div class="modal-mask" @click="closeOnMaskClick && close(false)" />
        <div class="modal-container-wrapper">
          <div class="modal-container" :style="containerStyle">
            <h3 v-if="heading || localized" class="modal-heading">
              {{ heading || localized }}
            </h3>
            <div class="modal-content">
              <slot/>
            </div>
            <div class="modal-footer" v-if="showFooter">
              <slot name="footer">
                <action-button variation="plain" v-if="cancelText" @click="close(false)">
                  {{cancelText}}
                </action-button>
                <action-button :variation="confirmVariation" @click="close(true)" :disabled="disableConfirm">
                  {{confirmText}}
                </action-button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <span @click="show" v-if="showToggle">
      <slot name="toggle">
        <action-button :disabled="disabled" :icon="toggleIcon" :variation="toggleVariation">{{showText}}</action-button>
      </slot>
    </span>
  </div>
</template>

<script>
/**
 * Modal dialog with customizable heading, cancel, confirm, toggle and inner content
 */

import modalMixin from "./modalMixin"

export default {
  name: "Modal",
  status: "review",
  mixins: [modalMixin],
  props: {
    /**
     * The modal heading.
     */
    heading: {
      type: String,
      required: false
    },
    /**
     * Text for button showing the modal
     */
    showText: {
      type: String,
      default: "Open modal"
    },
    /**
     * Show footer
     */
    showFooter: {
      type: Boolean,
      default: true
    },
    /**
     * The icon for button showing the modal.
     */
    toggleIcon: {
      type: String,
      required: false
    },
    /**
     * The variation for button showing the modal.
     */
    toggleVariation: {
      type: String,
      required: false
    },
    /**
     * The variation for confirm button. Follows action-button variation support.
     */
    confirmVariation: {
      type: String,
      default: "primary"
    },
    /**
     * Text for confirmation button
     */
    confirmText: {
      type: String,
      default: "OK"
    },
    /**
     * Boolean for disabling the toggle
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Text for cancel button
     */
    cancelText: {
      type: String
    },
    /**
     * Overriding styles for modal-container
     */
    containerStyle: {
      type: Object
    },
    /**
     * Close dialog on mask click
     */
    closeOnMaskClick: {
      type: Boolean,
      default: true
    },
    /**
     * Show toggle slot or not
     */
    showToggle: {
      type: Boolean,
      default: true
    },
    /**
     * Disable confirm button
     */
    disableConfirm: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "modal.scss";
</style>

<docs>
  ```jsx
    <panel heading="Modals">
      <modal heading="Header" show-text="Save" confirm-text="Gotcha!" :container-style="{width: '700px'}">
        <p>
          Content
        </p>
      </modal>
      <modal heading="Header" confirm-text="Ok" cancel-text="Cancel" disable-confirm>
        <action-button slot="toggle">Save</action-button>
        <p>
          Content
        </p>
      </modal>
      <modal heading="Header" show-text="Disabled modal" confirm-text="Ok" cancel-text="Cancel" disabled>
        <p>
          Content
        </p>
      </modal>
        <modal heading="Header"
               show-text="Styled show button"
               confirm-text="Ok"
               cancel-text="Cancel"
               toggle-icon="check"
               toggle-variation="primary success">
            <p>
                Content
            </p>
        </modal>
    </panel>
  ```
</docs>
