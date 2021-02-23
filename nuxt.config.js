module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - Ben Winding",
    link: [
      { name: "msapplication-TileColor", content: "#800000" },
      { name: "theme-color", content: "#800000" },
    ],
    meta: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#800000" },

  buildModules: ["@nuxtjs/sitemap", "nuxt-svg-loader", '@nuxtjs/tailwindcss'],

  icon: {
    iconSrc: "static/icons/icon.png"
  },

  manifest: {
    name: "Ben Winding",
    lang: "en",
    background_color: "#ffffff"
  },

  sitemap: {
    path: "/sitemap.xml",
    hostname: "https://benwinding.com",
    cacheTime: 1000 * 60 * 15,
    gzip: true
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: ["pts"],
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.devtool = "#source-map";
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  plugins: [{ src: "~/plugins/pts.js", ssr: false }]
};
