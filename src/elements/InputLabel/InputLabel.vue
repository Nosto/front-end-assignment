<template>
  <label :for="labelFor || siblingId" class="label" :variation="variation">
      <slot>{{ localized }}</slot>
  </label>
</template>

<script>
import i18n from "../i18n"

/**
 * Use input labels to label input fields and give them additional clarity beyond the placeholder. Labels should be short, clear and define the input.
 */
export default {
  name: "InputLabel",
  status: "prototype",
  props: {
    /**
     * Which form element is this label for.
     */
    for: {
      type: String
    },
    /**
     * Variation styles of the label
     * Example: `inline`
     */
    variation: {
      type: String
    }
  },
  mixins: [i18n],
  computed: {
    labelFor() {
      return this.for
    }
  },
  data() {
    return {
      siblingId: null
    }
  },
  methods: {
    setSiblingId() {
      let idx = this.$parent.$children.indexOf(this)
      let sibling = this.$parent.$children[idx + 1]
      this.siblingId = sibling && sibling.id
    }
  },
  updated() {
    this.setSiblingId()
  }
}
</script>

<style lang="scss" scoped>
@import "InputLabel.scss";
</style>

<docs>
  ```jsx
  <div>
    <panel heading="Input Label">
      <input-label for="foo" tooltip="Lorem ipsum">The quick brown fox</input-label>
    </panel>
  </div>
  ```
</docs>
