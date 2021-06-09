<template>
  <div class="grid" :style="style">
    <slot/>
  </div>
</template>

<script>
import designTokens from "@/assets/tokens/tokens.json"

/**
 * CSS Grid based Grid implementation
 */
export default {
  name: "Grid",
  props: {
    /**
     * List of column definitions (grid-template-columns)
     */
    columns: {
      type: String
    },
    /**
     * List of row definitions (grid-template-rows)
     */
    rows: {
      type: String
    },
    /**
     * Grid template via area definitions (grid-template-areas)
     */
    areas: {
      type: String
    },
    /**
     * CSS padding in px
     */
    padding: {
      type: [String, Number]
    },
    /**
     * Size of vertical grid lines (grid-column-gap)
     */
    columnGap: {
      type: [String, Number],
      default: designTokens.space_x_small
    },
    /**
     * Size of horizontal grid lines (grid-row-gap)
     */
    rowGap: {
      type: [String, Number],
      default: designTokens.space_x_small
    },
    /**
     * Align all cells along main axis (align-items)
     */
    alignItems: {
      type: String
    },
    /**
     * Control the alignment of grid items along cross axis (justify-items)
     */
    justifyItems: {
      type: String
    },
    /**
     * Control the alignment of grid column items along cross axis (justify-content)
     */
    justifyContent: {
      type: String
    },
    /**
     * Control the auto-placed item flow inside a grid (grid-auto-flow)
     */
    autoFlow: {
      type: String
    }
  },
  computed: {
    style() {
      return {
        gridTemplateColumns: this.columns,
        gridTemplateRows: this.rows,
        gridTemplateAreas: this.areas,
        gridColumnGap: this.columnGap,
        gridRowGap: this.rowGap,
        gridAutoFlow: this.autoFlow,
        padding: this.padding,
        alignItems: this.alignItems,
        justifyItems: this.justifyItems,
        justifyContent: this.justifyContent
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  align-items: start;
  @include stack-space($space-x-small);

  > [grid-left] {
    justify-self: start;
  }
  > [grid-center] {
    justify-self: center;
  }
  > [grid-right] {
    justify-self: end;
  }
}
</style>

<docs>
  ```jsx
  <grid columns="2fr 1fr 1fr 1fr">
    <panel heading="Grid Column">
      Grid column content.
    </panel>
    <panel heading="Grid Column">
      Grid column content.
    </panel>
    <panel heading="Grid Column">
      Grid column content.
    </panel>
  </grid>
  ```
</docs>
