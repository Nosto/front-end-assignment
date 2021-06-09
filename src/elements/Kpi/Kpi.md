KPI (Key Performance Indicators) component is used to communicate most important metric from displayed view.

## Variations

The component has four different colour variation support for the text value.

- `success`
- `warning`
- `danger`
- `secondary`

### Usage

```
<kpi variation="secondary" title="Example title" value="Example value"></kpi>
```

## Size

Additionally, there are two size variations.

- `default`
- `small`

### Usage

```
  <kpi title="Small KPI title" value="Small KPI value" small />
```

## Skeleton screen

KPI component has `skeleton-box` style mixin included within the component as conditional styling class. If the value is not available due data fetch, then the loader will be shown. Skeleton box is a low fidelity UI into which information is gradually loaded. It gives users a visual cue that the content is being loaded into each UI element.

After 4 seconds, KPIs will appear.

### Usage

```jsx
new Vue({
  data() {
    return {
      kpiData: [
        {
          title: "Info"
        },
        {
          title: "Warning"
        },
        {
          title: "Error"
        },
        {
          title: "Success"
        }
      ],
      loading: true
    }
  },
  mounted() {
    /**
     * DEMO HELPER CODE
     **/
    setTimeout(() => {
      this.kpiData = [
        {
          value: "Gathering information...",
          variation: "secondary"
        },
        {
          value: "Not enough data",
          variation: "warning"
        },
        {
          value: "Failed",
          variation: "danger"
        },
        {
          value: "Positive information",
          variation: "success"
        }
      ].map(
        (m, index) =>
          (this.kpiData[index] = {
            ...this.kpiData[index],
            value: m.value,
            variation: m.variation
          })
      )
      this.loading = false
    }, 4000)
  },
  methods: {
    /**
     * DEMO HELPER CODE
     **/
    refreshLoading() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 4000)
    }
  },
  template: `
  <div class="preview-container">
    <div v-for="kpi in kpiData">
      <kpi :title="kpi.title" :value="kpi.value" :variation="kpi.variation" v-bind="{loading}" ghost-load/>
    </div>
    <action-button variation="primary" size="small" @click="refreshLoading">Refresh loading</action-button>
  </div>
  `
})
```

## Tag and clickable support

### Tag

Component supports `tag` component usage in title field by using the `tag` prop in the component declaration. The tag variation can be controlled via `tagVariation` prop.

### Click event

If it is required to control actions based on the item's `click` event, the component can emit those by adding `clickable` prop. Without the prop, the click event is not emitted. This is due to keep control of the event emitting.

### Usage

```jsx
new Vue({
  data() {
    return {
      data: [
        {
          title: "Info",
          value: "200",
          variation: "secondary"
        },
        {
          title: "Warning",
          value: "400",
          variation: "warning"
        },
        {
          title: "Error",
          value: "100000%",
          variation: "danger"
        },
        {
          title: "Success",
          value: "800",
          variation: "success"
        }
      ],
      clickAction: "no click"
    }
  },
  methods: {
    /**
     * DEMO HELPER CODE
     **/
    clickedKpi(idx) {
      this.clickAction = idx + " clicked"
    }
  },
  template: `
  <div>
    <div class="preview-container">
      <div v-for="(kpi, idx) in data">
      <!-- Demo helper -->
        <text-style>{{'Clickable: '}}{{ idx < 2 }}</text-style>
        <text-style>{{'Index: '}}{{idx}}</text-style>
        <!-- Component -->
        <kpi :title="kpi.title" :value="kpi.value" :tag="idx === 1" :variation="idx < 2 ? 'regular' : kpi.variation" :loading="kpi.loading" ghost-load @click="clickedKpi(idx)" :clickable="idx < 2"/>
        <br/>
        <kpi :title="kpi.title" :value="kpi.value" :tag="idx === 1" tag-variation="green" :variation="idx < 2 ? 'regular' : kpi.variation" :loading="kpi.loading" ghost-load @click="clickedKpi(idx)" :clickable="idx < 2" small/>
      </div>
      <!-- Demo helper -->
      <text-style>{{clickAction}}</text-style>
    </div>
  </div>
  `
})
```
