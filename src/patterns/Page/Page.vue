<template>
  <div class="page" ref="page">
    <slot name="navigational-tabs"/>
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<script>
/**
 * Root component for Vue apps with top line and side navigation
 *
 * A typical playcart Vue app will have something like
 * ```
 * <page>
 *  <router-view>
 *   <layout>content</layout>
 *  </router-view>
 * </page>
 * ```
 */


export default {
  name: "Page",
  status: "prototype",
  props: {
    /**
     * The nav items to pass to the side navigation.
     */
    navItems: {
      type: Array,
      required: true
    },
    /**
     * The current account object to pass to the page.
     */
    account: {
      type: Object
    },
    /**
     * The accounts function to pass to the page.
     */
    accounts: {
      type: Function
    },
    /**
     * The user object to pass to the page.
     */
    user: {
      type: Object,
      required: true
    },
    /**
     * Regex that defines which urls are considered internal to the app.
     * Will handle navigation directly when defined
     */
    internal: {
      required: false
    },
    /**
     * Automatically navigate to first child
     */
    toFirstChild: {
      type: Boolean,
      default: true
    },
    /**
     * Loading state of page
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Set min width for top bar e.g. in custom cases
     */
    topBarMinWidth: {
      type: [String, Number],
      required: false
    },
    inPageTitle: {
      type: String
    }
  },
  data() {
    return {
      topbarHidden: false
    }
  },
  computed: {
    inPageNavTitle() {
      return !this.inPageTitle ? (this.$route.meta && this.$route.meta.inPageNavTitle) || "" : this.inPageTitle
    },
    inPageNavItems() {
      return this.$route.meta && this.$route.meta.inPageNav ? this.$route.meta.inPageNav : []
    },
    customHeader() {
      return this.$route.meta && this.$route.meta.customHeader && Object.keys(this.$route.meta.customHeader).length > 0
    },
    accountNotifications() {
      let { account } = this
      return account && account.banners && account.banners.length > 0
    }
  },
  methods: {
    subnav(showSubNav) {
      if (showSubNav) {
        this.$refs.page.setAttribute("sub-nav", "")
      } else {
        this.$refs.page.removeAttribute("sub-nav")
      }
    },
    getPath(url) {
      if (url.indexOf("//") > -1) {
        url = url.split("//")[1]
        if (url.indexOf("/") > -1) {
          url = url.substring(url.indexOf("/"))
        }
      }
      return url
    },
    goto(url) {
      if (this.internal) {
        if (this.internal.test(url)) {
          this.$router.push({ path: this.getPath(url) })
        } else if (url.indexOf("#") !== 0) {
          window.location.href = url
        }
      }
    },
    selectItem(item, url) {
      /**
       * selectedItem event.
       *
       * @event selectedItem
       * @type {Object}
       */
      this.$emit("selectedItem", item, url)
      this.goto(url)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "Page.scss";
</style>
