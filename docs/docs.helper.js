// Vue Design System helpers
import "codemirror/mode/jsx/jsx"

/**
 * This is Vue Design System’s JS helper file for docs.
 * You can add more things if/when needed.
 */
import Vue from "vue"
import activeNav from "./utils/activeNav"
import filterSearch from "./utils/filterSearch"
import statusLabels from "./utils/statusLabels"

Vue.mixin(statusLabels)

document.addEventListener("DOMContentLoaded", () => {
  filterSearch.methods.init()
  activeNav.methods.init()
})

window.addEventListener("hashchange", () => {
  filterSearch.methods.init()
  activeNav.methods.init()
})


Vue.config.productionTip = false
Vue.prototype.$i18n = key =>
  key
    .split(".")
    .filter(e => e[0].toLowerCase() === e[0])
    .join(" ")
