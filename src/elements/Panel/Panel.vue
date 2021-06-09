<template>
  <div :class="['panel',variation]" :id="id">
   <grid class="panel-header" columns="auto auto" v-if="heading || localized || $slots.heading">
     <heading :level="headingLevel" class="panel-heading">
       <slot name="heading">{{ heading || localized }}</slot>
     </heading>
     <div class="panel-topright" grid-right>
       <slot name="topRight"/>
     </div>
   </grid>
    <slot>{{ localized }}</slot>
  </div>
</template>

<script>
import i18n from "../i18n"

/**
 * TODO: This should be replaced with a description of the component.
 */
export default {
  name: "Panel",
  status: "prototype",
  props: {
    /**
     * The id of the panel.
     */
    id: {
      type: String,
      default() {
        return "id_" + this._uid
      }
    },
    /**
     * The panel heading.
     */
    heading: {
      type: String,
      required: false
    },
    /**
     * Valid property (used in form validation)
     */
    valid: {
      type: Boolean,
      default: true
    },
    /**
     * Size variation
     */
    variation: {
      type: String,
      default: "default",
      validator: value => {
        return value.match(/(default|small)/)
      }
    }
  },
  mixins: [i18n],
  computed: {
    headingLevel() {
      return this.variation === "default" ? "h4" : "h5"
    }
  }
}
</script>

<style lang="scss" scoped>
@import "Panel.scss";
</style>

<docs>
  ```jsx
  <div>
    <panel heading="Panel heading here">
      <span>Panel content…<br/> Lorem ipsum</span>
    </panel>
    <panel heading="Another">
      <action-button variation="plain" slot="topRight">Edit</action-button>
      <span>Content</span>
    </panel>
    <panel heading="Small variation" variation="small">
      <span>Small variation</span>
    </panel>
  </div>
  ```
</docs>
