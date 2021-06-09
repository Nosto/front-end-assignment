// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import DesignSystem from "./system"
import Vue from "vue"
import VueLazyload from "vue-lazyload"
import VueResource from "vue-resource"
import Vuelidate from "vuelidate"

// provide localization mock data here
let i18n = function(key) {
  switch (key) {
    case "create.new.segment":
      return "Create a new segment"
    default:
      return key
  }
}

Vue.use(Vuelidate)
Vue.use(VueLazyload)
Vue.use(VueResource)
Vue.use(DesignSystem, { i18n })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App }
})
