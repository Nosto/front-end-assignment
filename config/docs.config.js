const path = require("path")
const baseConfig = require("../build/webpack.base.conf.js")
const merge = require("webpack-merge")

module.exports = {
  /**
   * Name of your design system. Changes both page title and sidebar logo.
   */
  title: "Nosto Design System",
  /**
   * Most of the styles are defined in /docs/docs.styles.scss
   */
  theme: {
    maxWidth: "100%",
    sidebarWidth: 240,
    fontFamily: {
      base: ["Aeonik", "Helvetica", "Arial", "sans-serif"],
      monospace: ["Apercu", "'Liberation Mono'", "Menlo", "monospace"]
    }
  },
  /**
   * Path to static assets directory
   */
  assetsDir: path.join(__dirname, "../src/assets"),
  exampleMode: "expand",
  usageMode: "expand",
  /**
   * Enabling the below option will break things in Vue Desing System!
   */
  skipComponentsWithoutExample: false,
  /**
   * We’re defining below JS and SCSS requires for the documentation.
   */
  require: [path.join(__dirname, "../docs/docs.helper.js"), path.join(__dirname, "../docs/docs.styles.scss")],
  /**
   * Enabling the following option splits sections into separate views.
   */
  pagePerSection: true,
  sections: [
    {
      name: "Getting Started",
      content: "../docs/getting-started.md",
      components: "../docs/components/status/Components.vue"
    },
    {
      name: "Design Tokens",
      content: "../docs/tokens.md",
      components: () => [
        "../docs/components/tokens/Color.vue",
        "../docs/components/tokens/FontSize.vue",
        "../docs/components/tokens/Spacing.vue",
        "../docs/components/tokens/All.vue"
      ]
    },
    {
      name: "Elements",
      content: "../docs/elements.md",
      components: "../src/elements/**/[A-Z]*.vue",
      sectionDepth: 1
    },
    {
      name: "Patterns",
      content: "../docs/patterns.md",
      components: "../src/patterns/**/[A-Z]*.vue",
      sectionDepth: 1
    },
    {
      /**
       * Private components have to be loaded into the documentation as well,
       * otherwise anything using them will be broken. We’re loading them in
       * their own section, which then gets hidden in util/docs/hidePrivate.js
       */
      name: "Private Components",
      components: "../src/**/[_]*.vue"
    }
  ],
  /**
   * Custom wrapper template for the documentation.
   */
  template: {
    title: "Nosto Design System",
    lang: "en",
    trimWhitespace: true,
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1.0"
        },
        {
          name: "format-detection",
          content: "telephone=no"
        }
      ]
    }
  },
  /**
   * Ignore app.vue, tests, and example component.
   */
  ignore: [
    "**/App.vue",
    "**/__tests__/**",
    "**/*.test.js",
    "**/*.test.jsx",
    "**/*.spec.js",
    "**/*.spec.jsx"
  ],
  webpackConfig: merge(baseConfig, {
    module: {
      rules: [
        {
          test: /\.(css?|scss)(\?.*)?$/,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
            {
              loader: "sass-resources-loader",
              options: {
                resources: [
                  path.join(__dirname, "../src/assets/tokens/tokens.scss"),
                  path.join(__dirname, "../src/assets/tokens/tokens.map.scss"),
                  path.join(__dirname, "../src/styles/styles.scss")
                ]
              }
            }
          ]
        }
      ]
    }
  }),
  tocMode: "expand",
  styleguideDir: "../dist/docs"
  /**
   * Configure docs server to redirect asset queries
   */
  // configureServer(app) {
  //   // `app` is the instance of the express server running the docs
  //   app.get("/assets/:file", (req, res) => {
  //     res.redirect(req.params.file)
  //   })
  // },
}
