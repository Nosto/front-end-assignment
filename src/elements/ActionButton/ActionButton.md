## Use buttons to trigger actions and links.

### Types of buttons and hierarchy

Buttons come in three types:

- Primary
- Default
- Plain

```jsx
<div class="preview-container">
  <action-button variation="primary">Primary</action-button>
  <action-button>Default</action-button>
  <action-button variation="plain">Plain</action-button>
</div>
```

#### Primary

Primary button is used to highlight the strongest call to action. They should appear only once per view not including a modal dialog. Not every screen requires a primary button.

```jsx
<div class="preview-container">
  <action-button variation="primary">Primary</action-button>
  <action-button size="small" variation="primary">
    Small
  </action-button>
</div>
```

#### Default

A standard button is used in most cases.

```jsx
<div class="preview-container">
  <action-button>Default</action-button>
  <action-button disabled href="nosto.com">
    Disabled
  </action-button>
  <action-button size="small">Small</action-button>
</div>
```

#### Plain

Use with a primary button for actions that are less crucial such as “Cancel".

```jsx
<div class="preview-container">
  <action-button variation="plain">Plain</action-button>
  <action-button variation="plain" icon="copy" />
</div>
```

### Destructive actions

The danger button appears for a destructive action such as deleting. Use them according to their hierarchy in the UI and the space available.

- Primary buttons for wizards and modals.
- Default buttons for actions outside of wizards and modals.
- Plain buttons for table controls.
- Icon only buttons for table rows where tiny controls are required and space is limited.

```jsx
<div class="preview-container">
  <action-button variation="primary danger" icon="trash-alt">
    Danger
  </action-button>
  <action-button variation="danger" icon="trash-alt">
    Danger
  </action-button>
  <action-button variation="plain danger" icon="trash-alt" />
</div>
```

### Full-Width

Buttons can expand to full-width if required.

```jsx
<div class="preview-container">
  <action-button variation="primary" icon="arrow-right" width="expand">
    Sign in
  </action-button>
</div>
```

### Button icons

#### Icon weight

Apply `solid` to icon object if you prefer to use solid style. Solids are usually reserved for small icons, so use this sparingly.

```jsx
<div class="preview-container">
  <action-button variation="danger" icon="trash-alt">
    Danger
  </action-button>
  <action-button variation="danger" :icon="{name: 'trash-alt', solid: true}">
    Danger
  </action-button>
</div>
```

#### Icon position

By using `icon-right` you can push icon to the right side of the button. Default is left.

```jsx
<div class="preview-container">
  <action-button variation="secondary" icon="cog">
    Default
  </action-button>
  <action-button variation="secondary" icon="cog" icon-right>
    Icon-Right
  </action-button>
</div>
```

### Buttons used in other components

#### Secondary

Secondary button is used in `data-table` top right controls

```jsx
<div class="preview-container">
  <action-button variation="secondary" icon="cog">
    Configure
  </action-button>
</div>
```

#### Link Button

Link button is used in `overlay` component for creating a dropdown. You can use it as an alternative to `plain` button where space is limited.

```jsx
<div class="preview-container">
  <action-button variation="link">And</action-button>
</div>
```

### When you just want to use href

```jsx
<div class="preview-container">
  <action-button href="http://www.google.com">Google</action-button>
</div>
```

### A button styling when you need to compose a vertical list of buttons

Suitable for dropdowns and lists. Use `variation="list rounded-corners"` if you need border-radius.

```jsx
<div style="display: flex; flex-direction: column; width: 200px; margin-bottom: 32px;">
  <action-button variation="list">Item</action-button>
  <action-button variation="list">Item</action-button>
  <action-button variation="list">Item</action-button>
  <action-button variation="list">Item</action-button>
</div>
```

### Candidates for deprecation

#### More

Use when the button triggers a drop-down overlay with more actionable choices.

```jsx
<div class="preview-container">
  <action-button variation="more" icon="ellipsis-h">
    More actions
  </action-button>
  <action-button variation="plain more" icon="ellipsis-h">
    More actions
  </action-button>
</div>
```

#### Success

Use it in wizards as a primary button to finalize the action.

```jsx
<div class="preview-container">
  <action-button variation="primary success" icon="check">
    Success
  </action-button>
</div>
```
