<template>
  <div class="button-group" :no-border="noBorder">
    <slot/>
  </div>
</template>

<script>
/**
 * Use ButtonGroups to group related buttons together. Typical uses are in DataTable controls.
 */
export default {
  name: "ButtonGroup",
  status: "ready",
  props: {
    /**
     * Whether the button group has border
     */
    noBorder: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "ButtonGroup.scss";
</style>

<docs>
  ```jsx
  new Vue({
    data(){
      return {
        customer: 'new',
        customer2: 'new',
        currentView: 'list',
        customerOptions: [
          {id:'new', label:'New Customers', tooltip:'tooltip new'},
          {id:'returning', label:'Returning Customers', tooltip:'tooltip returning'},
        ],
        customerOptions2: [
          {id:'new', label:'New Customers', icon: 'th'},
          {id:'returning', label:'Returning Customers', icon: 'list'},
        ],
        viewOptions: [
          {id:'list', label:'List', icon: 'list', tooltip: 'List'},
          {id:'grid', label:'Grid', icon: 'th', tooltip: "Grid"},
        ],
        deviceOptions: ['Desktop','Mobile','Tablet'],
        devices: []
      }
    },
    template: `
    <div>
      <panel heading='Type'>
        <h4>With Border</h4><br>
        <button-group>
            <action-button>Button 1</action-button>
            <action-button>Button 2</action-button>
            <action-button>Button 3</action-button>
            <action-button>Button 4</action-button>
            <action-button>Button 5</action-button>
          </button-group>
        <br><h4>No Border</h4><br>
        <button-group :no-border="true">
            <action-button>Button 1</action-button>
            <action-button>Button 2</action-button>
            <action-button>Button 3</action-button>
            <action-button>Button 4</action-button>
            <action-button>Button 5</action-button>
          </button-group>
        <br><h4>Inline</h4><br>
          <button-group inline>
            <action-button icon="cloud-download-alt">Export to CSV</action-button>
            <action-button icon="facebook">Create Audience</action-button>
            <action-button disabled icon="google">Sync to Google Analytics</action-button>
          </button-group>
      </panel>
    </div>
  `
  })
  ```
</docs>
