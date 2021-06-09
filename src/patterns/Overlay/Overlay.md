## Overlay is a wrapper that can be opened on demand and offer extended context.

It should be used instead of a [Tooltip](http://localhost:6060/#/Elements/Tooltip) for showing a full paragraph of text or more UI elements.

### Triggers

- hover (use this one, unless design specifies differently)
- click

### Using overlay to build a dropdown

Wrap [ActionButton](http://localhost:6060/#/Elements/ActionButton) inside `Overlay` and use `variation="list"`.

### Overlay Demos

#### On hover

```jsx
<div class="preview-container">
  <overlay hover :padding="16" :width="400">
    <action-button slot="toggle">Hover me</action-button>
    <text-style variation="strong" style="display: block;">Promotion Rules</text-style>
    <text-style variation="default">Choose from configured Promotion Rules to be applied, and define how many products you want promoted within the selected categories. </text-style>
    <text-link href="" size="base" style="display: block; margin-top: 8px;">Learn more</text-link>
  </overlay>
</div>
```

#### On click

```jsx
<div class="preview-container">
  <overlay :padding="16" :width="400">
    <action-button slot="toggle">Click me</action-button>
    <text-style variation="strong" style="display: block;">Promotion Rules</text-style>
    <text-style variation="default">Choose from configured Promotion Rules to be applied, and define how many products you want promoted within the selected categories. </text-style>
    <text-link href="" size="base" style="display: block; margin-top: 8px;">Learn more</text-link>
  </overlay>
</div>
```

#### Dropdown

```jsx
<div class="preview-container">
  <overlay hover toggle-text="I am a dropdown">
    <action-button variation="list" disabled>
      I am disabled
    </action-button>
    <action-button variation="list">Button</action-button>
    <action-button variation="list">Button</action-button>
  </overlay>
</div>
```

#### Hover + modal

```jsx
new Vue({
  data() {
    return {
      modalOpen: false
    }
  },
  template: `
    <div class="preview-container">
      <overlay hover v-bind="{modalOpen}" toggle-text="I am a dropdown">
        <action-button variation="list" disabled>
          I am disabled
        </action-button>
        <action-button variation="list">Button</action-button>
        <action-button variation="list">Button</action-button>
        <modal @open="modalOpen = true" @closed="modalOpen = false">
          <action-button slot="toggle">Open modal</action-button>
          <p>I am modal content</p>
        </modal>
      </overlay>
    </div>
  `
})
```