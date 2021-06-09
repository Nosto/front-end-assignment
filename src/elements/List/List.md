## Use List component to present content in list form

List component has two types:

- Unordered / `ul` (default)
- Ordered / `ol`

#### Unordered

```jsx
<div class="preview-container">
  <list>
    <li>Yellow</li>
    <li>Red</li>
    <li>Green</li>
  </list>
</div>
```

#### Ordered

```jsx
<div class="preview-container">
  <list type="ol">
    <li>First</li>
    <li>Second</li>
    <li>Third</li>
  </list>
</div>
```

Additionally, List component has two modifier attributes to achieve the usual representational cases:

- Plain
- Inline

#### Plain

When the List has `plain` attribute, the list items will be presented without list-styling.

```jsx
<div class="preview-container">
  <list plain>
    <li>
      <tag variation="yellow">Yellow</tag>
    </li>
    <li>
      <tag variation="red">Red</tag>
    </li>
    <li>
      <tag variation="green">Green</tag>
    </li>
  </list>
</div>
```

#### Inline

When the List has `inline` attribute, the list items will be presented inline instead of being stacked.

```jsx
<div class="preview-container">
  <list inline>
    <li>
      <tag variation="yellow">Yellow</tag>
    </li>
    <li>
      <tag variation="red">Red</tag>
    </li>
    <li>
      <tag variation="green">Green</tag>
    </li>
  </list>
</div>
```
