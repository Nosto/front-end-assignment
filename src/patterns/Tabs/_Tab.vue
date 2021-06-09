<template>
  <div :style="{display: visible ? 'block' : 'none'}">
    <slot>{{$i18n("no.content.given")}}</slot>
  </div>
</template>

<script>
/**
 * TODO: This should be replaced with a description of the component.
 */
export default {
  name: "Tab",
  status: "ready",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    this.$parent.$emit("changed")
  },
  destroyed() {
    this.$parent.$emit("changed")
  }
}
</script>

<docs>
  Used internally in <a href="#tabs">Tabs</a>
</docs>
